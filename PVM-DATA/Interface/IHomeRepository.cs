using PVM_DATA.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace PVM_DATA.Interface
{
    public interface IHomeRepository
    {
        DataTable GetPost(string staff_type);
        int SavePost(Post data);
        void DeletePost(int post_id);
        DataSet GetReference();
        DataTable GetActionHistory(int post_id);
        int SaveActionHistory(ActionHistory data);
        DataTable GetActionHistoryRef();

        DataTable GetReqtDocuments(int post_id);
        DataTable GetReqtDocumentsRef();
        int SaveReqtDocuments(ReqtDocuments data);
        void CreateMailItem(Post data);
        void Reminder(int post_no, string pos_title, string email);
        //IReadOnlyCollection<User> GetCurrentUser(string username);
    }
}