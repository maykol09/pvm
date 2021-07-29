using PVM_DATA.Entities;
using PVM_DATA.Interface.AdoProcedure;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.Loader;
using System.Text;
using System.Web;

namespace PVM_DATA.Template
{
    public class TemplateGenerator
    {
        public static string GetVacantReports(string staff_type, string status, string office, IAdoProcedureRepository adoProcedureRepository)
        {
            var param = new List<SqlParameter>();
            param.Add(new SqlParameter("@staff_type", staff_type));
            param.Add(new SqlParameter("@status", status));
            param.Add(new SqlParameter("@office", office));
            var sb = new StringBuilder();
            sb.Append(@"
                        <html>
                            <header>
	                            <style>
		                            th{border-bottom:.5px solid black;}
		                            table{border-top: .5px solid black;border-bottom:.5px solid;border-collapse: collapse;}
		                            td{font-size: 13px;border-bottom:1px solid black;}
		                            body{font-family: 'Segoe UI',Segoe,Tahoma,Helvetica,Arial,sans-serif!important;}
                                </style>
                            </header>
                            <body>");

            sb.Append(@"<br /><div class='header' style='margin:auto;width:400px;'><h1>Vacant Posts Report</h1></div>");
            using (var ds = adoProcedureRepository.FillData("usp_vacant_reports_get", param.ToArray()))
            {
                var pageBreak = ds.Tables[1].Rows.Count > 1 ? "page-break-after: always;" : "";
                foreach (DataRow row in ds.Tables[1].Rows)
                {
                    sb.AppendFormat(@"<br/><div style='float:left;display:inline;'>
		                            <h3>{0}</h3>
	                            </div>	
	                            <div style='float:right;margin-top:30px;'>
		                            <div style='display:inline;margin-right:50px;'><span style='font-weight:bold;'>Staff type : </span>{1}</div>
		                            <div style='display:inline;margin-right:20px;'><span style='font-weight:bold;'>Status : </span>{2}</div>
	                            </div>
	                            <table style='width:100%;{3}'>
		                            <tr>
			                            <th style='width:7%'>Post No</th>
			                            <th style='width:10%'>Post Title</th>
			                            <th style='width:4%'>Grade</th>
			                            <th style='width:5%'>Fund</th>
			                            <th style='width:7%'>Duty stn/Unit</th>
			                            <th>PTAEO</th>
			                            <th style='width:8%'>Temporary Staff</th>
			                            <th style='width:7%'>Last Incumbent</th>
			                            <th style='width:7%'>Vacant Since</th>
			                            <th style='width:25%'>Per Remarks</th>
		                            </tr>", row["office_code"].ToString(), row["staff_type"].ToString(), row["post_status"].ToString(), pageBreak);
                    foreach (DataRow row2 in ds.Tables[0].Rows)
                    {
                        if (row["office_code"].ToString() == row2["office_code"].ToString() && row["staff_type"].ToString() == row2["staff_type"].ToString() && row["post_status"].ToString() == row2["post_status"].ToString())
                            sb.AppendFormat(@"<tr>
				                        <td>{0}</td>
				                        <td>{1}</td>
				                        <td>{2}</td>
				                        <td>{3}</td>
				                        <td>{4}</td>
				                        <td>{5}</td>
				                        <td>{6}</td>
				                        <td>{7}</td>
				                        <td>{8}</td>
				                        <td>{9}</td>
			                        </tr>", row2["post_no"].ToString(),
                                               row2["post_title"].ToString(),
                                               row2["grade_level"].ToString(),
                                               row2["fund_code"].ToString(),
                                               row2["unit_code"].ToString(),
                                               row2["allotment_no"].ToString(),
                                               row2["temporary_staff"].ToString(),
                                               row2["last_incumbent"].ToString(),
                                               row2["vacant_since"].ToString(),
                                               row2["per_remarks"].ToString());
                    }
                    sb.Append(@"</table>");
                    sb.Append(@"</body>
                        </html>");

                }
                return sb.ToString();
            }


        }
        public static string InactiveReports(string staff_type, IAdoProcedureRepository adoProcedureRepository)
        {
            var param = new List<SqlParameter>();
            param.Add(new SqlParameter("@staff_type", staff_type));
            var sb = new StringBuilder();
            sb.Append(@"
                        <html>
                            <header>
	                            <style>
		                            th{border-bottom:.5px solid black;}
		                            table{border-top: .5px solid black;border-bottom:.5px solid;border-collapse: collapse;}
		                            td{font-size: 13px;padding:5px;}
		                            body{font-family: 'Segoe UI',Segoe,Tahoma,Helvetica,Arial,sans-serif!important;}
                                </style>
                            </header>
                            <body>");

            sb.AppendFormat(@"<br /><div class='header' style='margin:auto;width:600px;'><h1>{0} Staff List of Inactive Post</h1></div>", staff_type);
            using (var ds = adoProcedureRepository.FillData("usp_inactive_reports_get", param.ToArray()))
            {

                sb.Append(@"
	                        <table style='width:100%;'>
		                        <tr>
			                        <th style='width:7%'>Post No</th>
			                        <th style='width:10%'>Post Title</th>
			                        <th style='width:4%'>Office</th>
			                        <th style='width:5%'>Dir/Unit</th>
			                        <th style='width:7%'>Post Grade</th>
			                           
		                        </tr>");
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    sb.AppendFormat(@"<tr>
				                    <td>{0}</td>
				                    <td>{1}</td>
				                    <td>{2}</td>
				                    <td>{3}</td>
				                    <td>{4}</td>
				                       
			                    </tr>", row["post_no"].ToString(),
                                            row["post_title"].ToString(),
                                            row["office_code"].ToString(),
                                            row["unit_code"].ToString(),
                                            row["grade_level"].ToString());

                }
                sb.Append(@"</table>");
                sb.Append(@"</body>
                        </html>");
              

            }
            return sb.ToString();


        }
        public static string PositionCreatedReports(string staff_type, string pd_status, string start_date, string end_date, IAdoProcedureRepository adoProcedureRepository)
        {
            var param = new List<SqlParameter>();
            param.Add(new SqlParameter("@staff_type", staff_type));
            param.Add(new SqlParameter("@pd_status", pd_status));
            param.Add(new SqlParameter("@start_date", start_date));
            param.Add(new SqlParameter("@end_date", end_date));
            var sb = new StringBuilder();
            sb.Append(@"
                        <html>
                            <header>
	                            <style>
		                            th{border-bottom:.5px solid black;}
		                            table{border-top: .5px solid black;border-bottom:.5px solid;border-collapse: collapse;}
		                            td{font-size: 13px;padding:5px;}
		                            body{font-family: 'Segoe UI',Segoe,Tahoma,Helvetica,Arial,sans-serif!important;}
                                </style>
                            </header>
                            <body>");

            sb.AppendFormat(@"<br /><div class='header' style='margin:auto;width:600px;'><h1>{0} Staff List of Inactive Post</h1></div>", staff_type);
            using (var ds = adoProcedureRepository.FillData("usp_position_created_get", param.ToArray()))
            {

                sb.Append(@"
	                        <table style='width:100%;'>
		                        <tr>
			                        <th style='width:7%'>Post No</th>
			                        <th style='width:10%'>Post Title</th>
			                        <th style='width:4%'>Office</th>
			                        <th style='width:5%'>Dir/Unit</th>
			                        <th style='width:7%'>Post Grade</th>
			                           
		                        </tr>");
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    sb.AppendFormat(@"<tr>
				                    <td>{0}</td>
				                    <td>{1}</td>
				                    <td>{2}</td>
				                    <td>{3}</td>
				                    <td>{4}</td>
				                       
			                    </tr>", row["post_no"].ToString(),
                                            row["post_title"].ToString(),
                                            row["office_code"].ToString(),
                                            row["unit_code"].ToString(),
                                            row["grade_level"].ToString());

                }
                sb.Append(@"</table>");
                sb.Append(@"</body>
                        </html>");


            }
            return sb.ToString();


        }
    }
}