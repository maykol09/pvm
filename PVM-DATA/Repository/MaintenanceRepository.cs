using PVM_DATA.Entities;
using PVM_DATA.Interface;
using PVM_DATA.Interface.AdoProcedure;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace PVM_DATA.Repository
{
    public class MaintenanceRepository : IMaintenanceRepository
    {
        private readonly IAdoProcedureRepository Iado;
        public MaintenanceRepository(IAdoProcedureRepository Iado)
        {
            this.Iado = Iado;
        }
        public DataTable SaveActionStep()
        {
            var param = new List<SqlParameter>();
            param.Add(new SqlParameter());
            using(var ds = Iado.FillData("usp_get_", param.ToArray()))
            {
                return ds.Tables[0];
            }
        }
        public DataTable GetUser()
        {
            var param = new List<SqlParameter>();
            using (var ds = Iado.FillData("usp_lib_user_level_get", param.ToArray()))
            {
                return ds.Tables[0];
            }
        }
        public int SaveUser(User data)
        {
            var param = new List<SqlParameter>();
            param.Add(new SqlParameter("@user_name", data.user_name));
            param.Add(new SqlParameter("@is_active", data.is_active));
            param.Add(new SqlParameter("@updated_by", data.updated_by));
            param.Add(new SqlParameter("@name", data.name));
             if(data.action == "I")
            {
                using (var ds = Iado.FillData("usp_user_ins", param.ToArray()))
                {
                    return Convert.ToInt32(ds.Tables[0].Rows[0][0]);
                }
            }
            else
            {
                param.Add(new SqlParameter("@lib_user_level_id", data.lib_user_level_id));
                using (var ds = Iado.FillData("usp_user_upd", param.ToArray()))
                {
                    return data.lib_user_level_id;
                }
            }
           
        }
        public void DelUser(int id)
        {
            var param = new List<SqlParameter>();
            param.Add(new SqlParameter("@id", id));
            Iado.FillData("usp_user_del", param.ToArray());
            
        }
        public string CheckUser(string user)
        {
            var param = new List<SqlParameter>();
            param.Add(new SqlParameter("@user", user));
            using (var ds = Iado.FillData("usp_user_check_get", param.ToArray()))
            {

                if(ds.Tables[0].Rows.Count == 0)
                {
                    return "noAccess";
                }
                else
                {
                    return "hasAccess";
                }

            }
        }
        public int SaveRef(ActionHistory data)
        {
            var param = new List<SqlParameter>();
            param.Add(new SqlParameter("@staff_type", data.staff_type));
            param.Add(new SqlParameter("@action_stage", data.action_stage));
            param.Add(new SqlParameter("@action_step", data.action_step));
            param.Add(new SqlParameter("@next_step", data.next_step));
            param.Add(new SqlParameter("@for_per_only", data.for_per_only));
            param.Add(new SqlParameter("@is_active", data.is_active));

            if (data.action == "I")
            {
                using (var ds = Iado.FillData("usp_lib_action_ins", param.ToArray()))
                {
                    return Convert.ToInt32(ds.Tables[0].Rows[0][0]);
                }
            }
            else
            {
                param.Add(new SqlParameter("@action_id", data.action_id));
                using (var ds = Iado.FillData("usp_lib_action_upd", param.ToArray()))
                {
                    return data.action_id;
                }
            }
        }
        public void DelRef(int id)
        {
            var param = new List<SqlParameter>();
            param.Add(new SqlParameter("@id", id));
            Iado.FillData("usp_action_ref_del", param.ToArray());

        }
    }
}