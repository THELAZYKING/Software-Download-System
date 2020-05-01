using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SDS_Backend.Models;

namespace SDS_Backend.Controllers
{
    [ApiController]
    [Route("api")]
    public class SoftwareDownloadSystem : ControllerBase
    {
        private readonly SDS_DBContext _context;
        
        public SoftwareDownloadSystem(SDS_DBContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SoftwareDownload>>> GetSoftwaresAsync()
        {
            return await _context.softwareDownloadsystem.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SoftwareDownload>> GetSoftwaresAsync(string id)
        {
            var software = await _context.softwareDownloadsystem.FindAsync(id);

            if (software == null)
            {
                return NotFound();
            }

            return software;
        }

        [HttpPost("postemp")]
        public async Task<ActionResult<SoftwareDownload>> PostSoftwareEMPAsync(SoftwareDownload data)
        {

            SMTPmail smptpMail = new SMTPmail(data);
            smptpMail.EmployeeSendRequest();
            smptpMail.TLRequest();


            _context.softwareDownloadsystem.Add(data);

            await _context.SaveChangesAsync();

            

            return CreatedAtAction("Success ", new { id = data.ID }, data);
        }

        [HttpPost("posttl")]
        public async Task<ActionResult<SoftwareDownload>> PostSoftwareTLAsync(SoftwareDownload data)
        {
            _context.softwareDownloadsystem.Add(data);

            await _context.SaveChangesAsync();

            SMTPmail smptpMail = new SMTPmail(data);


            if (data.Team_Lead_Status == "Approved")
            {
                smptpMail.TLApproveRequest();   // Request forwarded to NSD and approval mail sent to employee
            }
            else
            {
                smptpMail.TLRejectRequest();    //Rejection mail to Employee
            }

            return CreatedAtAction("Success ", new { id = data.ID }, data);
        }

        [HttpPost("postnsd")]
        public async Task<ActionResult<SoftwareDownload>> PostSoftwareNSDAsync(SoftwareDownload data)
        {
            _context.softwareDownloadsystem.Add(data);

            await _context.SaveChangesAsync();

            SMTPmail smptpMail = new SMTPmail(data);

            if (data.NSD_Response_Status == "Accepted")
            {
                smptpMail.NSDAcceptRequest();       //Link sent to employee
            }
            else
            {
                smptpMail.NSDRejectRequest();    //Link not Found!! to TL and employee
            }


            return CreatedAtAction("Success ", new { id = data.ID }, data);
        }

        [HttpPut("Like")]
        public async Task<IActionResult> PutMovie(SoftwareDownload Software)
        {
           
            _context.Entry(Software).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
               
                    throw;
                
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<SoftwareDownload>> DeleteMovie (string id)
        {
            var movie = await _context.softwareDownloadsystem.FindAsync(id);
            
            if (movie == null)
            {
                return NotFound();
            }

            _context.softwareDownloadsystem.Remove(movie);
            await _context.SaveChangesAsync();

            return movie;


        }

    }

}
