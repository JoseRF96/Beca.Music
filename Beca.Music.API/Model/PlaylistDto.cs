using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Beca.Music.API.Model
{
    public class PlaylistDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }

        public List<SongDto> Songs { get; set; }

        public static PlaylistDto Of(Playlist p)
        {
            var playlistDto = new PlaylistDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Songs = p.Songs.Select(s => SongDto.Of(s)).ToList()
            };

            return playlistDto;
        }
    }
}

