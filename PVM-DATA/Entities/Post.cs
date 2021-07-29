using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PVM_DATA.Entities
{
    public class Post
    {
        public int post_id { get; set; }
        public string staff_type { get; set; }
        public string post_no { get; set; }
        public int rec_no { get; set; }
        public string vn_no { get; set; }
        public dynamic vn_close_date { get; set; }
        public string vn_url { get; set; }
        public string contract_duration { get; set; }
        public string post_title { get; set; }
        public string office_code { get; set; }
        public string dir_code { get; set; }
        public string unit_code { get; set; }
        public string grade_level { get; set; }
        public string post_type { get; set; }
        public string fund_code { get; set; }
        public string allotment_no { get; set; }
        public string last_incumbent { get; set; }
        public string vacant_since { get; set; }
        public string temporary_staff { get; set; }
        public int? no_of_applicants { get; set; }
        public int? no_of_internal_applicants { get; set; }
        public string selected_candidate { get; set; }
        public string selected_gender { get; set; }
        public string selected_source { get; set; }
        public string selected_geographical_origin { get; set; }
        public string selected_geographical_origin_ctry { get; set; }
        public string post_remarks { get; set; }
        public string per_remarks { get; set; }
        public string dir_remarks { get; set; }
        public string wrclo_remarks { get; set; }
        public string history_remarks { get; set; }
        public string pd_status { get; set; }
        public string post_status { get; set; }
        public string with_incumbent { get; set; }
        public string in_reports { get; set; }
        public int? priority_level { get; set; }
        public dynamic target_completion_date { get; set; }
        public string hiring_manager { get; set; }
        public string user_name { get; set; }
        public string date_updated { get; set; }
        public string action { get; set; }
        public string email { get; set; }
    }
    public static class CalendarInfo
    {
        public static string Class { get; set; }
        public static string Summary { get; set; }
        public static DateTime Created { get; set; } = DateTime.Now;
        public static string Description { get; set; }
        public static DateTime Start { get; set; } = DateTime.Now;
        public static DateTime End { get; set; } = DateTime.Now;
        public static int Sequence { get; set; } = 0;
        public static string Location { get; set; }
        public static string EventTitle { get; set; }

        public static int Trigger { get; set; }
        public static int Repeat { get; set; }
        public static long Duration { get; set; }

        public static DateTime Until { get; set; }
        public static List<DayOfWeek> Recurrence { get; set; }

    }
}