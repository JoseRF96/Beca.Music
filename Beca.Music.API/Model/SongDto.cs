using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Beca.Music.API.Model
{
    public class SongDto
    {
        public int Id { get; set; }
        
        public string Title { get; set; }

        public string Artist { get; set; }

        public string Playlist { get; set; }

        public static SongDto Of (Song song)
        {
            string playlistName = "";
            if(song.Playlist != null)
            {
                playlistName = song.Playlist.Name;
            }
            else
            {
                playlistName = "Desconocido";
            }
            var songDto = new SongDto
            {
                Id = song.Id,
                Title = song.Title,
                Artist = song.Artist,
                Playlist = playlistName
            };
            return songDto;
        }
    }
}
