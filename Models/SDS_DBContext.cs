using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SDS_Backend.Models
{
    public class SDS_DBContext : DbContext
    {
        public SDS_DBContext(DbContextOptions<SDS_DBContext> options) : base(options)
        {
        }
        public DbSet<SoftwareDownload> softwareDownloadsystem { get; set; }

        internal void ToList()
        {
            throw new NotImplementedException();
        }
    }
}
