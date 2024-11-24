using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI_Log.Custom;
using WebAPI_Log.Models;
using WebAPI_Log.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using WebAPI_Log.Context;
using WebAPI_Log.Entities;

namespace WebAPI_Log.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    [ApiController]
    public class AccesoController : ControllerBase
    {
        private readonly AppDbContext _appDbContext; // Cambie a AppDbContext
        private readonly Utilidades _utilidades;

        public AccesoController(AppDbContext appDbContext, Utilidades utilidades) // Cambie a AppDbContext
        {
            _appDbContext = appDbContext; // Cambie a AppDbContext
            _utilidades = utilidades;
        }

        [HttpPost]
        [Route("Registrarse")]
        public async Task<IActionResult> Registrarse(UsuarioDTO objeto)
        {
            var modeloUsuario = new Usuario
            {
                Nombre = objeto.Nombre,
                Correo = objeto.Correo,
                Clave = _utilidades.EncriptarSHA256(objeto.Clave),
            };

            await _appDbContext.Usuarios.AddAsync(modeloUsuario);  // Cambie a AppDbContext
            await _appDbContext.SaveChangesAsync();  // Cambie a AppDbContext

            if (modeloUsuario.IdUsuario != 0)
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = true });
            else
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = false });
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginDTO objeto)
        {
            var usuarioEncontrado = await _appDbContext.Usuarios  // Cambie a AppDbContext
                                    .Where(u =>
                                        u.Correo == objeto.Correo &&
                                        u.Clave == _utilidades.EncriptarSHA256(objeto.Clave)
                                    ).FirstOrDefaultAsync();  // Cambie a AppDbContext

            if (usuarioEncontrado == null)
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = false, token = "" });
            else
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = true, token = _utilidades.generarJWT(usuarioEncontrado) });
        }

        // Validación del Token
        [HttpGet]
        [Route("ValidarToken")]
        public IActionResult ValidarToken([FromQuery] string token)
        {
            bool respuesta = _utilidades.validarToken(token);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = respuesta });
        }
    }
}
