using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;
using WebAPI_Log.Context;
using WebAPI_Log.Entities;
using WebAPI_Log.Models.DTOs;
using WebAPI_Log.Services;


namespace WebAPI_Log.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PerfilController : ControllerBase
    {
        private readonly PerfilService _perfilService;
        public PerfilController(PerfilService perfilService)
        {
            _perfilService = perfilService;
        }

        [HttpGet]
        [Route("lista")]
        public async Task<ActionResult<List<PerfilDTO>>> Get()
        {
            return Ok(await _perfilService.lista());
        }

    }
}
