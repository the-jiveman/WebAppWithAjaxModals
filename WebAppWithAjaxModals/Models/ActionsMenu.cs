using System;
using System.Collections.Generic;

namespace WebAppWithAjaxModals.Models
{
    public enum ActionsMenuIcon
    {
        Edit,
        Delete
    }

    public class ActionsMenu
    {
        public IEnumerable<ActionsMenuItem> Items { get; set; } = new List<ActionsMenuItem>();
    }

    public class ActionsMenuItem
    {
        public bool IsEnabled { get; set; } = true;

        public string Text { get; set; }
        public string Url { get; set; }
        public string CssClass { get; set; }
        public ActionsMenuIcon Icon { get; set; }

        public string IconCssClass
        {
            get
            {
                switch (Icon)
                {
                    case ActionsMenuIcon.Edit:
                        return "fa fa-pencil";
                    case ActionsMenuIcon.Delete:
                        return "fa fa-trash";
                    default:
                        throw new ArgumentOutOfRangeException(nameof(Icon), Icon, null);
                }
            }
        }

    }
}