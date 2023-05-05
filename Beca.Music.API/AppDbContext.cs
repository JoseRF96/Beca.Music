using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Beca.Music.API.Model;
using Microsoft.EntityFrameworkCore;

namespace Beca.Music.API
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Playlist> Playlists { get; set; }

        public DbSet<Song> Songs { get; set; }
    }

    //protected override void OnModelCreating(ModelBuilder modelBuilder)
    //{
    //    modelBuilder.Entity<Playlist>()
    //        .HasKey(p => p.Id);
    //}
}
