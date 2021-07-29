using System;
using System.Collections.Generic;
using System.Text;

namespace PVM_DATA.Interface.AdoProcedure
{
    public interface IDatabaseContextFactory
    {
        IDatabaseContext Context();
    }
}
