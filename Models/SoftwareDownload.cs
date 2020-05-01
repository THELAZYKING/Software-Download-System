using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SDS_Backend.Models
{
    public class SoftwareDownload
    {
        [Key]
        [Column(TypeName = "nvarchar(20)")]
        public string ID { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string Employee_Code { get; set; }
        [Column(TypeName = "nvarchar(40)")]
        public string Employee_EmailID { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Software_Name { get; set; }
        [Column(TypeName = "nvarchar(30)")]
        public string Software_Version { get; set; }
        [Column(TypeName = "nvarchar(10)")]
        public string Software_License { get; set; }
        [Column(TypeName = "nvarchar(255)")]
        public string Tags { get; set; }
        [Column(TypeName = "nvarchar(255)")]
        public string Website_Link { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string Team_Lead_ID { get; set; }

        [Column(TypeName = "nvarchar(40)")]
        public string Employee_Request_Time { get; set; }

        [Column(TypeName = "nvarchar(20)")]
        public string Team_Lead_Status { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string Team_Lead_Remark { get; set; }
        [Column(TypeName = "nvarchar(40)")]
        public string Team_Lead_Response_Time { get; set; }
        [Column(TypeName = "nvarchar(70)")]
        public string NSD_Response_Status { get; set; }
        [Column(TypeName = "nvarchar(300)")]
        public string NSD_Response_Link { get; set; }
        [Column(TypeName = "nvarchar(300)")]
        public string NSD_Response_Remark { get; set; }
        [Column(TypeName = "nvarchar(40)")]
        public string NSD_Response_Time { get; set; }
        [Column(TypeName = "nvarchar(150)")]
        public string Level_Status { get; set; }

        public int Likes { get; set; }
    }
}
