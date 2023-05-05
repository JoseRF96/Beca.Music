﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Beca.Music.API.Model
{
    [Table("Songs")]
    public class Song
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Artist { get; set; }
        [ForeignKey("FK_Playlist_Song")]
        public int? PlaylistId { get; set; }
        public Playlist Playlist { get; set; }
    }
}
