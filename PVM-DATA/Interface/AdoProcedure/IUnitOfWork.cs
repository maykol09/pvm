using System;
using System.Collections.Generic;
using System.Text;
using System.Data.SqlClient;
namespace PVM_DATA.Interface.AdoProcedure
{
    public interface IUnitOfWork : IDisposable
    {
        SqlTransaction Transaction { get; }
        IDatabaseContext DataContext { get; }
        void Commit();
        SqlTransaction BeginTransaction();
        void Dispose();
    }
}
