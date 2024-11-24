namespace WebAPI_Log.Models.DTOs
{
    public class ClienteDTO
    {
        public int IdCliente { get; set; }
        public string? NombreCompleto { get; set; }
        public string Email { get; set; }
        public string Numero { get; set; }

        public int IdPerfil { get; set; }
        public string? NombrePerfil { get; set; }

        public DateTime FechaIngreso { get; set; }
    }
}
