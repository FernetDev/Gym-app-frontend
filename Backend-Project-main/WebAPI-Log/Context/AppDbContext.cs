using System;
using Microsoft.EntityFrameworkCore;
using WebAPI_Log.Entities;

namespace WebAPI_Log.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // DbSet para las entidades
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Perfil> Perfiles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuración para la entidad Usuario
            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario).HasName("PK__Usuario__5B65BF97B07C57D5");

                entity.ToTable("Usuario");

                entity.Property(e => e.Clave)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Correo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            // Configuración para la entidad Cliente
            modelBuilder.Entity<Cliente>(tb =>
            {
                tb.HasKey(col => col.IdCliente);
                tb.Property(col => col.IdCliente).UseIdentityColumn().ValueGeneratedOnAdd();
                tb.Property(col => col.NombreCompleto).HasMaxLength(50);
                tb.Property(col => col.FechaIngreso).HasColumnType("datetime"); // Agregado para Fecha de Ingreso
                tb.HasOne(col => col.PerfilReferencia).WithMany(p => p.ClientesReferencia)
                  .HasForeignKey(col => col.IdPerfil);
                tb.ToTable("Cliente");
            });

            // Configuración para la entidad Perfil
            modelBuilder.Entity<Perfil>(tb =>
            {
                tb.HasKey(col => col.IdPerfil);
                tb.Property(col => col.IdPerfil).UseIdentityColumn().ValueGeneratedOnAdd();
                tb.Property(col => col.Nombre).HasMaxLength(50);
                tb.ToTable("Perfil");

                tb.HasData(
                    new Perfil { IdPerfil = 1, Nombre = "Alumno Normal" },
                    new Perfil { IdPerfil = 2, Nombre = "Alumno Personalizado" },
                    new Perfil { IdPerfil = 3, Nombre = "Alumno PowerLifter" }
                );
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}