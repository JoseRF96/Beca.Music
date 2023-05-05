using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Beca.Music.API;
using Beca.Music.API.Model;

namespace Beca.Music.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SongsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Songs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SongDto>>> GetSongs()
        {
            var songs = await _context.Songs.Include(s => s.Playlist).ToListAsync();
            var songsDto = songs.Select(s => SongDto.Of(s));
            return Ok(songsDto);
        }

        // GET: api/Songs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SongDto>> GetSong(int id)
        {
            var song = await _context.Songs.Include(s => s.Playlist).FirstOrDefaultAsync(s => s.Id == id);

            if (song == null)
            {
                return NotFound();
            }
            SongDto songDto = SongDto.Of(song);
            return songDto;
        }

        // PUT: api/Songs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSong(int id, Song song)
        {
            if (id != song.Id)
            {
                return BadRequest();
            }

            _context.Entry(song).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SongExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Songs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SongDto>> PostSong(Song song)
        {
            _context.Songs.Add(song);
            var playlist = await _context.Playlists.FindAsync(song.PlaylistId);
            song.Playlist = playlist;
            if (song.PlaylistId == 0)
            {
                song.PlaylistId = null;
            }
            if (playlist != null)
            {
                playlist.Songs.Add(song);
            }
            await _context.SaveChangesAsync();
            SongDto songDto = SongDto.Of(song);
            //return CreatedAtAction("GetSong", new { id = song.Id }, song);
            return songDto;
        }

        [HttpPost("{songId}/Playlists/{playlistId}")]
        public async Task<ActionResult> AddSongToPlaylist(int songId, int playlistId)
        {
            var playlist = await _context.Playlists.Include(p => p.Songs).FirstOrDefaultAsync(p => p.Id == playlistId);
            var song = await _context.Songs.FindAsync(songId);

            if(playlist == null || song == null)
            {
                return NotFound();
            }

            if(playlist.Songs != null && playlist.Songs.Any(s => s.Id == songId))
            {
                return BadRequest("La canción ya está en la playlist");
            }

            playlist.Songs.Add(song);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Songs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSong(int id)
        {
            var song = await _context.Songs.FindAsync(id);
            if (song == null)
            {
                return NotFound();
            }

            _context.Songs.Remove(song);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SongExists(int id)
        {
            return _context.Songs.Any(e => e.Id == id);
        }
    }
}
