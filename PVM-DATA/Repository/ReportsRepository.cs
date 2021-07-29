using DinkToPdf;
using DinkToPdf.Contracts;
using Microsoft.AspNetCore.Mvc;
using PVM_DATA.Entities;
using PVM_DATA.Interface;
using PVM_DATA.Interface.AdoProcedure;
using PVM_DATA.Template;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace PVM_DATA.Repository
{
    public class ReportsRepository : IReportsRepository
    {
        private readonly IAdoProcedureRepository adoProcedureRepository;
        private readonly IConverter _converter;
        public ReportsRepository(IAdoProcedureRepository adoProcedureRepository, IConverter converter)
        {
            this.adoProcedureRepository = adoProcedureRepository;
            _converter = converter;
        }
        public byte[] VacantReports(string staff_type, string status, string office)
        {
            var globalSettings = new GlobalSettings
            {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4,
                Margins = new MarginSettings { Top = 10 },
                DocumentTitle = "PDF Report",
            };

            var objectSettings = new ObjectSettings
            {
                PagesCount = true,
                HtmlContent = TemplateGenerator.GetVacantReports(staff_type,status,office, adoProcedureRepository),
                WebSettings = { DefaultEncoding = "utf-8", UserStyleSheet = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp/src/assets", "style.css")},
                HeaderSettings = { FontName = "Arial", FontSize = 9, Right = "Page [page] of [toPage]", Line = false },
                FooterSettings = { FontName = "Arial", FontSize = 7, Line = false, Left = "Printed on " + DateTime.Now },
               

            };
            var pdf = new HtmlToPdfDocument
            {
                GlobalSettings = globalSettings,
                Objects = { objectSettings },
            };

            var file = _converter.Convert(pdf);
            return file;
        }
        public byte[] InactiveReports(string staff_type)
        {
            var globalSettings = new GlobalSettings
            {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4,
                Margins = new MarginSettings { Top = 10 },
                DocumentTitle = "PDF Report",
            };

            var objectSettings = new ObjectSettings
            {
                PagesCount = true,
                HtmlContent = TemplateGenerator.InactiveReports(staff_type, adoProcedureRepository),
                WebSettings = { DefaultEncoding = "utf-8", UserStyleSheet = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp/src/assets", "style.css") },
                HeaderSettings = { FontName = "Arial", FontSize = 9, Right = "Page [page] of [toPage]", Line = false },
                FooterSettings = { FontName = "Arial", FontSize = 7, Line = false, Left = "Printed on " + DateTime.Now },


            };
            var pdf = new HtmlToPdfDocument
            {
                GlobalSettings = globalSettings,
                Objects = { objectSettings },
            };

            var file = _converter.Convert(pdf);
            return file;
        }
        public byte[] PositionCreatedReports(string staff_type, string pd_status, string start_date, string end_date)
        {
            var globalSettings = new GlobalSettings
            {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4,
                Margins = new MarginSettings { Top = 10 },
                DocumentTitle = "PDF Report",
            };

            var objectSettings = new ObjectSettings
            {
                PagesCount = true,
                HtmlContent = TemplateGenerator.PositionCreatedReports(staff_type, pd_status, start_date, end_date, adoProcedureRepository),
                WebSettings = { DefaultEncoding = "utf-8", UserStyleSheet = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp/src/assets", "style.css") },
                HeaderSettings = { FontName = "Arial", FontSize = 9, Right = "Page [page] of [toPage]", Line = false },
                FooterSettings = { FontName = "Arial", FontSize = 7, Line = false, Left = "Printed on " + DateTime.Now },


            };
            var pdf = new HtmlToPdfDocument
            {
                GlobalSettings = globalSettings,
                Objects = { objectSettings },
            };

            var file = _converter.Convert(pdf);
            return file;
        }
    }
}