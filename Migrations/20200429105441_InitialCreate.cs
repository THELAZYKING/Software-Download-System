using Microsoft.EntityFrameworkCore.Migrations;

namespace SDS_Backend.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "softwareDownloadsystem",
                columns: table => new
                {
                    ID = table.Column<string>(type: "nvarchar(20)", nullable: false),
                    Employee_Code = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    Employee_EmailID = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Software_Name = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Software_Version = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    Software_License = table.Column<string>(type: "nvarchar(10)", nullable: true),
                    Tags = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Website_Link = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Team_Lead_ID = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    Employee_Request_Time = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Team_Lead_Status = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    Team_Lead_Remark = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Team_Lead_Response_Time = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    NSD_Response_Status = table.Column<string>(type: "nvarchar(70)", nullable: true),
                    NSD_Response_Link = table.Column<string>(type: "nvarchar(300)", nullable: true),
                    NSD_Response_Remark = table.Column<string>(type: "nvarchar(300)", nullable: true),
                    NSD_Response_Time = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Level_Status = table.Column<string>(type: "nvarchar(150)", nullable: true),
                    Likes = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_softwareDownloadsystem", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "softwareDownloadsystem");
        }
    }
}
