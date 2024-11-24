namespace WebAPI_Log.Entities
{
    public class Cliente
    {
        public int IdCliente { get; set; }
        public string NombreCompleto { get; set; }
        public string Email {  get; set; }
        public string Numero { get; set; }

        public int IdPerfil { get; set; }
        public DateTime FechaIngreso { get; set; }
        //Id relacion tabla perfil EF 
        public virtual Perfil PerfilReferencia { get; set; }
        
    }
}
