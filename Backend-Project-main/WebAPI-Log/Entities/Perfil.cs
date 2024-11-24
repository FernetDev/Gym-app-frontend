namespace WebAPI_Log.Entities
{
    public class Perfil
    {
        public int IdPerfil { get; set; }

        public string Nombre { get; set; }

        //Para que Perfil tenga muchos Clientes y Clientes solo un Perfil
        public virtual ICollection<Cliente> ClientesReferencia { get; set; }   
    }
}
