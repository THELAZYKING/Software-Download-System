using SDS_Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.IO;

namespace SDS_Backend.Controllers
{
        public class SMTPmail
        {
            readonly string to = "bhaskar3797mishra@gmail.com"; //To address    
            readonly string from = "sdsnav@gmail.com"; //From address 
            SmtpClient client = new SmtpClient("smtp.gmail.com", 587); //Gmail smtp 
            MailMessage message;
            SoftwareDownload softwareDownload;
            protected string siteLink = "https://localhost:44396/";
            public SMTPmail(SoftwareDownload softwareDownload)
            {
            this.softwareDownload = softwareDownload;

            //Fetching Settings from WEB.CONFIG file.  
          /*  string emailSender = ConfigurationManager.AppSettings["username"];
            string emailSenderPassword = ConfigurationManager.AppSettings["password"];*/  
               

                

                message = new MailMessage(to, from);

                message.IsBodyHtml = true;
                

                System.Net.NetworkCredential basicCredential1 = new
                System.Net.NetworkCredential("sdsnav@gmail.com", "qwerty1029");

                client.EnableSsl = true;
                client.UseDefaultCredentials = true;
                client.Credentials = basicCredential1;
            }
            public void EmployeeSendRequest()
            {
                string FilePath = "C:\\Users\\akm_3\\Desktop\\SDS-Backend-master\\SDS-Backend-master\\Controllers\\SMTP\\EmailTemplates\\Request1EmpCopy.html";
                StreamReader str = new StreamReader(FilePath);
                string MailText = str.ReadToEnd();
                str.Close();

            MailText = MailText.Replace("[Date]", softwareDownload.Employee_Request_Time);
                MailText = MailText.Replace("[SoftwareName]", softwareDownload.Software_Name);
                MailText = MailText.Replace("[Softwareversion]", softwareDownload.Software_Version);
                MailText = MailText.Replace("[License]", softwareDownload.Software_License);
                MailText = MailText.Replace("[TLName]", softwareDownload.Team_Lead_ID);

                string mailbody = MailText;
                message.Body = mailbody;
                
                message.Subject = "[Request Generated]Software Download Request Copy";
                SendMessage();      //Request Forwarded to respective TL
            }

             public void TLRequest()
        {
            string FilePath = "C:\\Users\\akm_3\\Desktop\\SDS-Backend-master\\SDS-Backend-master\\Controllers\\SMTP\\EmailTemplates\\Request1TLCopy.html";
            StreamReader str = new StreamReader(FilePath);
            string MailText = str.ReadToEnd();
            str.Close();

            MailText = MailText.Replace("[Date]", softwareDownload.Employee_Request_Time);
            MailText = MailText.Replace("[SoftwareName]", softwareDownload.Software_Name);
            MailText = MailText.Replace("[Softwareversion]", softwareDownload.Software_Version);
            MailText = MailText.Replace("[License]", softwareDownload.Software_License);
            MailText = MailText.Replace("[EmpCode]", softwareDownload.Employee_Code);
            MailText = MailText.Replace("[id]", softwareDownload.ID);


            string mailbody = MailText;
            message.Body = mailbody;
            
            message.Subject = "[Request Recieved] New Software Download Request ";
            SendMessage();      //Request Forwarded to respective TL
        }
            public void TLRejectRequest()
            {
            string FilePath = "C:\\Users\\akm_3\\Desktop\\SDS-Backend-master\\SDS-Backend-master\\Controllers\\SMTP\\EmailTemplates\\Request2EmpCopy.html";
            StreamReader str = new StreamReader(FilePath);
            string MailText = str.ReadToEnd();
            str.Close();

            MailText = MailText.Replace("[Date]", softwareDownload.Employee_Request_Time);
            MailText = MailText.Replace("[SoftwareName]", softwareDownload.Software_Name);
            MailText = MailText.Replace("[Softwareversion]", softwareDownload.Software_Version);
            MailText = MailText.Replace("[License]", softwareDownload.Software_License);
            MailText = MailText.Replace("[EmpCode]", softwareDownload.Employee_Code);
            MailText = MailText.Replace("[TLName]", softwareDownload.Team_Lead_ID);
            MailText = MailText.Replace("[TLResponse]", softwareDownload.Team_Lead_Remark);


            string mailbody = MailText;
            message.Body = mailbody;


            message.Subject = "[Request Rejected] Software Download Request";
            SendMessage();      //Request forwarded to NSD
        }

            public void TLApproveRequest()
            {
            string FilePath = "C:\\Users\\akm_3\\Desktop\\SDS-Backend-master\\SDS-Backend-master\\Controllers\\SMTP\\EmailTemplates\\Request2NSDCopy.html";
            StreamReader str = new StreamReader(FilePath);
            string MailText = str.ReadToEnd();
            str.Close();

            MailText = MailText.Replace("[Date]", softwareDownload.Employee_Request_Time);
            MailText = MailText.Replace("[SoftwareName]", softwareDownload.Software_Name);
            MailText = MailText.Replace("[Softwareversion]", softwareDownload.Software_Version);
            MailText = MailText.Replace("[License]", softwareDownload.Software_License);
            MailText = MailText.Replace("[EmpCode]", softwareDownload.Employee_Code);
            MailText = MailText.Replace("[id]", softwareDownload.ID);
            MailText = MailText.Replace("[TLName]", softwareDownload.Team_Lead_ID);
            MailText = MailText.Replace("[TLResponse]", softwareDownload.Team_Lead_Remark);


            string mailbody = MailText;
            message.Body = mailbody;


            message.Subject = "[Request Recieved ]New Software Download Request";
                SendMessage();      //Request forwarded to NSD
            }

            public void NSDRejectRequest()
            {
            string FilePath = "C:\\Users\\akm_3\\Desktop\\SDS-Backend-master\\SDS-Backend-master\\Controllers\\SMTP\\EmailTemplates\\Request3Reject.html";
            StreamReader str = new StreamReader(FilePath);
            string MailText = str.ReadToEnd();
            str.Close();

            MailText = MailText.Replace("[Date]", softwareDownload.Employee_Request_Time);
            MailText = MailText.Replace("[SoftwareName]", softwareDownload.Software_Name);
            MailText = MailText.Replace("[Softwareversion]", softwareDownload.Software_Version);
            MailText = MailText.Replace("[License]", softwareDownload.Software_License);
            MailText = MailText.Replace("[EmpCode]", softwareDownload.Employee_Code);
            MailText = MailText.Replace("[id]", softwareDownload.ID);
            MailText = MailText.Replace("[TLName]", softwareDownload.Team_Lead_ID);
            MailText = MailText.Replace("[NSDResponse]", softwareDownload.NSD_Response_Remark);


            string mailbody = MailText;
            message.Body = mailbody;


            message.Subject ="[Request failed] Software Download Request";
            SendMessage();      //Request forwarded to NSD
            }

            public void NSDAcceptRequest()
            {
            string FilePath = "C:\\Users\\akm_3\\Desktop\\SDS-Backend-master\\SDS-Backend-master\\Controllers\\SMTP\\EmailTemplates\\Request3Approve.html";
            StreamReader str = new StreamReader(FilePath);
            string MailText = str.ReadToEnd();
            str.Close();

            MailText = MailText.Replace("[Date]", softwareDownload.Employee_Request_Time);
            MailText = MailText.Replace("[SoftwareName]", softwareDownload.Software_Name);
            MailText = MailText.Replace("[Softwareversion]", softwareDownload.Software_Version);
            MailText = MailText.Replace("[License]", softwareDownload.Software_License);
            MailText = MailText.Replace("[EmpCode]", softwareDownload.Employee_Code);
            MailText = MailText.Replace("[id]", softwareDownload.ID);
            MailText = MailText.Replace("[TLName]", softwareDownload.Team_Lead_ID);
            MailText = MailText.Replace("[TLResponse]", softwareDownload.Team_Lead_Remark);
            MailText = MailText.Replace("[NSDLink]", softwareDownload.NSD_Response_Link);


            string mailbody = MailText;
            message.Body = mailbody;


            message.Subject = "[Request Success] Software Download Request";
            SendMessage();
        }
            protected void SendMessage()
            {
                try
                {
                    client.Send(message);
                }

                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
}





  
      