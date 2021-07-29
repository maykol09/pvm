
using PVM_DATA.Entities;
using PVM_DATA.Interface;
using PVM_DATA.Interface.AdoProcedure;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Microsoft.Office.Interop.Outlook;
using OutlookApp = Microsoft.Office.Interop.Outlook.Application;
using System.Text;
using System.Net.Mail;
using System.IO;
using Attachment = System.Net.Mail.Attachment;
using Ical.Net.CalendarComponents;
using Ical.Net.DataTypes;
using Ical.Net.Serialization;

namespace PVM_DATA.Repository
{
    public class HomeRepository : IHomeRepository
    {
        private readonly IAdoProcedureRepository adoProcedureRepository;
        public HomeRepository(IAdoProcedureRepository adoProcedureRepository)
        {
            this.adoProcedureRepository = adoProcedureRepository;
        }

        public DataTable GetPost(string staff_type)
        {
            var param = new List<SqlParameter>();
            param.Add(new SqlParameter("@staff_type", staff_type));
            using (var ds = adoProcedureRepository.FillData("usp_post_get", param.ToArray()))
            {
                return ds.Tables[0];
            }
        }
        public int SavePost(Post data)
        {
            var param = new List<SqlParameter>();
            param.Add(new SqlParameter("@staff_type", nullToDbNull(data.staff_type)));

            param.Add(new SqlParameter("@post_no", nullToDbNull(data.post_no)));
            param.Add(new SqlParameter("@rec_no", intNull(data.rec_no)));
            param.Add(new SqlParameter("@vn_no", nullToDbNull(data.vn_no)));
            param.Add(new SqlParameter("@vn_close_date", data.vn_close_date == null ? DBNull.Value : data.vn_close_date));
            param.Add(new SqlParameter("@vn_url", nullToDbNull(data.vn_url)));
            param.Add(new SqlParameter("@contract_duration", nullToDbNull(data.contract_duration)));
            param.Add(new SqlParameter("@post_title", nullToDbNull(data.post_title)));
            param.Add(new SqlParameter("@office_code", nullToDbNull(data.office_code)));
            param.Add(new SqlParameter("@dir_code", nullToDbNull(data.dir_code)));
            param.Add(new SqlParameter("@unit_code", nullToDbNull(data.unit_code)));
            param.Add(new SqlParameter("@grade_level", nullToDbNull(data.grade_level)));
            param.Add(new SqlParameter("@post_type", nullToDbNull(data.post_type)));
            param.Add(new SqlParameter("@fund_code", nullToDbNull(data.fund_code)));
            param.Add(new SqlParameter("@allotment_no", nullToDbNull(data.allotment_no)));
            param.Add(new SqlParameter("@last_incumbent", nullToDbNull(data.last_incumbent)));
            param.Add(new SqlParameter("@vacant_since", nullToDbNull(data.vacant_since)));
            param.Add(new SqlParameter("@temporary_staff", nullToDbNull(data.temporary_staff)));
            param.Add(new SqlParameter("@no_of_applicants", intNull(data.no_of_applicants)));
            param.Add(new SqlParameter("@no_of_internal_applicants", intNull(data.no_of_internal_applicants)));
            param.Add(new SqlParameter("@selected_candidate", nullToDbNull(data.selected_candidate)));
            param.Add(new SqlParameter("@selected_gender", nullToDbNull(data.selected_gender)));
            param.Add(new SqlParameter("@selected_source", nullToDbNull(data.selected_source)));
            param.Add(new SqlParameter("@selected_geographical_origin", nullToDbNull(data.selected_geographical_origin)));
            param.Add(new SqlParameter("@selected_geographical_origin_ctry", nullToDbNull(data.selected_geographical_origin_ctry)));
            param.Add(new SqlParameter("@post_remarks", nullToDbNull(data.post_remarks)));
            param.Add(new SqlParameter("@per_remarks", nullToDbNull(data.per_remarks)));
            param.Add(new SqlParameter("@dir_remarks", nullToDbNull(data.dir_remarks)));
            param.Add(new SqlParameter("@wrclo_remarks", nullToDbNull(data.wrclo_remarks)));
            param.Add(new SqlParameter("@history_remarks", nullToDbNull(data.history_remarks)));
            param.Add(new SqlParameter("@pd_status", nullToDbNull(data.pd_status)));
            param.Add(new SqlParameter("@post_status", nullToDbNull(data.post_status)));
            param.Add(new SqlParameter("@with_incumbent", nullToDbNull(data.with_incumbent)));
            param.Add(new SqlParameter("@in_reports", nullToDbNull(data.in_reports)));
            param.Add(new SqlParameter("@priority_level", intNull(data.priority_level)));
            param.Add(new SqlParameter("@target_completion_date", data.target_completion_date == null ? DBNull.Value : data.target_completion_date));
            param.Add(new SqlParameter("@hiring_manager", nullToDbNull(data.hiring_manager)));
            param.Add(new SqlParameter("@user_name", nullToDbNull(data.user_name)));

            if (data.action == "I")
            {
                using (var ds = adoProcedureRepository.FillData("usp_post_ins", param.ToArray()))
                {
                    return Convert.ToInt32(ds.Tables[0].Rows[0][0]);
                }
            }
            else
            {
                param.Add(new SqlParameter("@post_id", data.post_id));
                using (var ds = adoProcedureRepository.FillData("usp_post_upd", param.ToArray()))
                {
                    return data.post_id;
                }
            }

        }
        public void DeletePost(int post_id)
        {
            var param = new List<SqlParameter>();
            param.Add(new SqlParameter("@post_id", post_id));
            adoProcedureRepository.FillData("usp_post_del", param.ToArray());

        }
        public DataSet GetReference()
        {
            var param = new List<SqlParameter>();
            using (var ds = adoProcedureRepository.FillData("usp_reference_get", param.ToArray()))
            {
                return ds;
            }
        }
        public DataTable GetActionHistory(int post_id)
        {
            var param = new List<SqlParameter>();
            param.Add(new SqlParameter("@post_id", post_id));
            using (var ds = adoProcedureRepository.FillData("usp_action_history_get", param.ToArray()))
            {
                return ds.Tables[0];
            }
        }
        public int SaveActionHistory(ActionHistory data)
        {
            var param = new List<SqlParameter>();
            param.Add(new SqlParameter("@post_id", data.post_id));
            param.Add(new SqlParameter("@action_date", data.action_date));
            param.Add(new SqlParameter("@action_id", data.action_id));
            param.Add(new SqlParameter("@action_remarks", nullToDbNull(data.action_remarks)));
            param.Add(new SqlParameter("@per_remarks", nullToDbNull(data.per_remarks)));
            if (data.action == "I")
            {
                using (var ds = adoProcedureRepository.FillData("usp_action_history_ins", param.ToArray()))
                {
                    return Convert.ToInt32(ds.Tables[0].Rows[0][0]);
                }

            }
            else
            {
                param.Add(new SqlParameter("@post_action_id", data.post_action_id));
                using (var ds = adoProcedureRepository.FillData("usp_action_history_upd", param.ToArray()))
                {
                    return data.post_action_id;
                }

            }

        }
        public DataTable GetActionHistoryRef()
        {
            var param = new List<SqlParameter>();
            using (var ds = adoProcedureRepository.FillData("usp_action_history_ref_get", param.ToArray()))
            {
                return ds.Tables[0];
            }
        }
        public DataTable GetReqtDocuments(int post_id)
        {
            var param = new List<SqlParameter>();
            param.Add(new SqlParameter("@post_id", post_id));
            using (var ds = adoProcedureRepository.FillData("usp_reqt_documents_get", param.ToArray()))
            {
                return ds.Tables[0];
            }
        }
        public DataTable GetReqtDocumentsRef()
        {
            var param = new List<SqlParameter>();
            using (var ds = adoProcedureRepository.FillData("usp_reqt_documents_ref_get", param.ToArray()))
            {
                return ds.Tables[0];
            }
        }

        public int SaveReqtDocuments(ReqtDocuments data)
        {
            var param = new List<SqlParameter>();
            param.Add(new SqlParameter("@post_id", data.post_id));
            param.Add(new SqlParameter("@reqt_date", data.reqt_date));
            param.Add(new SqlParameter("@reqt_id", data.reqt_id));
            param.Add(new SqlParameter("@reqt_remarks", nullToDbNull(data.reqt_remarks)));
            param.Add(new SqlParameter("@user_name", nullToDbNull(data.user_name)));
            if (data.action == "I")
            {
                using (var ds = adoProcedureRepository.FillData("usp_reqt_documents_ins", param.ToArray()))
                {
                    return Convert.ToInt32(ds.Tables[0].Rows[0][0]);
                }
            }
            else
            {
                param.Add(new SqlParameter("@post_reqt_id", data.post_reqt_id));
                using (var ds = adoProcedureRepository.FillData("usp_reqt_documents_upd", param.ToArray()))
                {
                    return data.post_reqt_id;
                }

            }
        }
        public void CreateMailItem(Post data)
        {
            var subject = "Vacancy Announcement " + data.vn_no + " - " + data.post_title + " (" + data.unit_code + ",) " + data.office_code + ", Position Number " +
     data.post_no + ", " + data.grade_level;
            var strb = new StringBuilder();

         var image = "https://apps.wpro.who.int/mcms/assets/images/WHO_WPRO_BLUE%20logo_.jpg";
            strb.AppendFormat("<table cellpadding='3' cellspacing='0' style='border: 2px solid #008080;font-family:Tahoma;font-weight: bold; font-size: 16px; color: Black;' > " +
      "<tr height= '50'>" +
      "<th width='235' align = 'center' style='border-color: #008080; border-right-style: solid; border-bottom-style: solid; border-right-width: 1px; border-bottom-width: 1px;' ><img src='{0}'/></th>" +
      "<th width='445' align = 'center' style='border-color: #008080; border-bottom-style: solid; border-bottom-width: 1px;'>WPRO/Personnel<br/>Vacancy Announcement</th>" +
      "</tr >", image);
      strb.Append("<tr height= '30'>" +
      "<td align = 'Left' bgcolor='#8DB3E2' style='border-color: #008080; border-right-style: solid; border-bottom-style: solid; border-right-width: 1px; border-bottom-width: 1px;font-family: Tahoma; font-weight: normal; font-size: 16px; color: White;Margin-Left: 15px' >Vacancy Notice No:</td>" +
      "<td align = 'Left' style='border-color: #008080; border-bottom-style: solid; border-bottom-width: 1px;font-family: Tahoma; font-weight: normal; font-size: 16px; color: Black;Margin-Left: 10px'>" + data.vn_no + "</td>" +
      "</tr>" +
      "<tr height= '30'>" +
      "<td align = 'Left' bgcolor='#8DB3E2' style='border-color: #008080; border-right-style: solid; border-bottom-style: solid; border-right-width: 1px; border-bottom-width: 1px;font-family: Tahoma; font-weight: normal; font-size: 16px; color: White;Margin-Left: 15px' >Title:</td>" +
      "<td align = 'Left' style='border-color: #008080; border-bottom-style: solid; border-bottom-width: 1px;font-family: Tahoma; font-weight: normal; font-size: 16px; color: Black;Margin-Left: 10px'>" + data.post_title + "</td>" +
      "</tr>" +
      "<tr height= '30'>" +
      "<td align = 'Left' bgcolor='#8DB3E2' style='border-color: #008080; border-right-style: solid; border-bottom-style: solid; border-right-width: 1px; border-bottom-width: 1px;font-family: Tahoma; font-weight: normal; font-size: 16px; color: White;Margin-Left: 15px' >Grade:</td>" +
      "<td align = 'Left' style='border-color: #008080; border-bottom-style: solid; border-bottom-width: 1px;font-family: Tahoma; font-weight: normal; font-size: 16px; color: Black;Margin-Left: 10px'>" + data.grade_level + "</td>" +
      "</tr>" +
      "<tr height= '30'>" +
      "<td align = 'Left' bgcolor='#8DB3E2' style='border-color: #008080; border-right-style: solid; border-bottom-style: solid; border-right-width: 1px; border-bottom-width: 1px;font-family: Tahoma; font-weight: normal; font-size: 16px; color: White;Margin-Left: 15px' >Contract type:</td>" +
      "<td align = 'Left' style='border-color: #008080; border-bottom-style: solid; border-bottom-width: 1px;font-family: Tahoma; font-weight: normal; font-size: 16px; color: Black;Margin-Left: 10px'>" + data.post_type + "</td>" +
      "</tr>" +
      "<tr height= '30'>" +
      "<td align = 'Left' bgcolor='#8DB3E2' style='border-color: #008080; border-right-style: solid; border-bottom-style: solid; border-right-width: 1px; border-bottom-width: 1px;font-family: Tahoma; font-weight: normal; font-size: 16px; color: White;Margin-Left: 15px' >Duration of contract:</td>" +
      "<td align = 'Left' style='border-color: #008080; border-bottom-style: solid; border-bottom-width: 1px;font-family: Tahoma; font-weight: normal; font-size: 16px; color: Black;Margin-Left: 10px'>" + data.contract_duration + "</td>" +
      "</tr>" +
      "<tr height= '30'>" +
      "<td align = 'Left' bgcolor='#8DB3E2' style='border-color: #008080; border-right-style: solid; border-bottom-style: solid; border-right-width: 1px; border-bottom-width: 1px;font-family: Tahoma; font-weight: normal; font-size: 16px; color: White;Margin-Left: 15px' >Duty station:</td>" +
      "<td align = 'Left' style='border-color: #008080; border-bottom-style: solid; border-bottom-width: 1px;font-family: Tahoma; font-weight: normal; font-size: 16px; color: Black;Margin-Left: 10px'></td>" +
      "</tr>" +
      "<tr height= '30'>" +
      "<td align = 'Left' bgcolor='#8DB3E2' style='border-color: #008080; border-right-style: solid; border-bottom-style: solid; border-right-width: 1px; border-bottom-width: 1px;font-family: Tahoma; font-weight: normal; font-size: 16px; color: White;Margin-Left: 15px' >Organizational unit:</td>" +
      "<td align = 'Left' style='border-color: #008080; border-bottom-style: solid; border-bottom-width: 1px;font-family: Tahoma; font-weight: normal; font-size: 16px; color: Black;Margin-Left: 10px'>" + data.unit_code + "</td>" +
      "</tr>" +
      "<tr height= '30'>" +
      "<td align = 'Left' bgcolor='#8DB3E2' style='border-color: #008080; border-right-style: solid; border-bottom-style: solid; border-right-width: 1px; border-bottom-width: 1px;font-family: Tahoma; font-weight: normal; font-size: 16px; color: White;Margin-Left: 15px' >Deadline for application:</td>" +
      "<td align = 'Left' style='border-color: #008080; border-bottom-style: solid; border-bottom-width: 1px;font-family: Tahoma; font-weight: normal; font-size: 16px; color: Black;Margin-Left: 10px'>" + data.target_completion_date + "</td>" +
      "</tr>" +
      "</tr>" +
      "<tr height= '30'>" +
      "<td align = 'Center' colspan='2' bgcolor='#8DB3E2' style='border-color: #008080; border-top-style: solid; border-top-width: 1px;font-family: Tahoma; font-weight: bold; font-size: 15px; color: #C00000;Margin-Left: 15px' >" +
       "Please <a href='" + data.vn_url + "' style='font-style: italic'>click here</a> to view the details" +
      "</td>" +
      "</tr>" +
      "</table>");

            //OutlookApp outlookApp = new OutlookApp();
            //MailItem mailItem = outlookApp.CreateItem(OlItemType.olMailItem);

            //mailItem.Subject = subject;
            //mailItem.HTMLBody = strb.ToString();

            ////Set a high priority to the message
            //mailItem.Importance = OlImportance.olImportanceHigh;
            //mailItem.Display(true);

            MailMessage message = new MailMessage();
 
            message.From = new MailAddress("wp.donotreply@who.int");
            message.To.Add(data.email);
            message.Subject = subject;
           
            message.Body = strb.ToString();
            message.IsBodyHtml = true;

            SmtpClient client = new SmtpClient("10.24.0.100", 25);
            client.UseDefaultCredentials = true;
            client.Send(message);

        }
        public void Reminder(int post_no, string post_title, string email)
        {
            //OutlookApp outlookApp = new OutlookApp();
            //TaskItem taskItem = outlookApp.CreateItem(OlItemType.olTaskItem);

            //taskItem.Subject = post_no + " " + post_title;
            //taskItem.ReminderTime = new DateTime();
            //taskItem.ReminderTime = DateTime.Now;
            //taskItem.ReminderTime.AddDays(1);
            //taskItem.StartDate = DateTime.Now;
            //taskItem.DueDate = DateTime.Now;
            //taskItem.Display(true);
            MailMessage message = new MailMessage();

            message.From = new MailAddress("wp.donotreply@who.int","PVM automated email");
            message.To.Add(email);
            message.Subject = post_no + " " + post_title;
            var calendar = new Ical.Net.Calendar();
            var alarm = new Alarm
            {
                // Summary = CalendarInfo.Summary,
                Trigger = new Trigger(TimeSpan.FromMinutes(CalendarInfo.Trigger)),
                Repeat = CalendarInfo.Repeat,
                Action = "Display"
            };

            var calEvent = new CalendarEvent();
            calEvent = new CalendarEvent
            {
                //Class = CalendarInfo.Class,
                Summary = post_no + " " + post_title,
                Created = new CalDateTime(DateTime.Now),
                Start = new CalDateTime(DateTime.Now),
                End = new CalDateTime(DateTime.Now.AddDays(1)),
                Sequence = 0,
                Uid = Guid.NewGuid().ToString(),


            };

            //calEvent.Alarms.Add(alarm);
            calendar.Events.Add(calEvent);
            var serializer = new CalendarSerializer(new SerializationContext());
            var serializedCalendar = serializer.SerializeToString(calendar);
            var bytesCalendar = Encoding.UTF8.GetBytes(serializedCalendar);
            MemoryStream ms = new MemoryStream(bytesCalendar);
            Attachment attachment = new System.Net.Mail.Attachment(ms, post_no + " " + post_title + ".ics", "text/calendar");
            message.Attachments.Add(attachment);
            using (SmtpClient smtp = new SmtpClient("10.24.0.100", 25))
            {
                smtp.Send(message);

            }
        }
        private string nullToDbNull(string data)
        {
            return data == null ? DBNull.Value.ToString() : data;
        }

        private int intNull(int? data)
        {
            return data == null ? 0 : Convert.ToInt32(data);
        }
        private string convertYN(string data)
        {
            if (data == "true")
            {
                return "Y";
            }
            else if (data == "false")
            {
                return "N";
            }
            else
            {
                return "";
            }
        }
    }
}