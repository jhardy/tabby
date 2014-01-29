(function($) {

    var tabby = 'tabby',
        defaults = {
            startAt: 0,
            tabItem: ".tab",
            tabPanel: ".tab-panels",
            panel: ".panel",
            activeClass:"active",
            activePanelClass: 'active-panel',
            after: false
    };

    function Tabby(el, options) {
        var _ = this;
            _.el = $(el);
            _.options = $.extend({}, defaults, options);
            _.tabs = _.el.find(_.options.tabItem);
            _.panelHolder = _.el.find(_.options.tabPanel);
            _.panels = _.panelHolder.find(_.options.panel);


            $(_.tabs[_.options.startAt]).addClass(_.options.activeClass);
            $(_.panels[_.options.startAt]).show().addClass(_.options.activePanelClass);


        _.init = function() {
            _.tabs.click(function(e) {
                e.preventDefault();
                _.changeTab($(this));
            });
        }

        _.changeTab = function(tab) {
            _.tabs.removeClass(_.options.activeClass);
            tab.addClass(_.options.activeClass);

            _.panels.hide().removeClass(_.options.activePanelClass);
            $(_.panels[tab.index()]).show().addClass(_.options.activePanelClass);

            _.after(_.options.after);
        }

        _.after = function(after) {
            if (after && typeof(after) === "function") {
                after();
            }
        }

        if(_.tabs.length > 1) {
            _.init();
        }
    }

    $.fn[tabby] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + tabby)) {
                $.data(this, 'plugin_' + tabby,
                new Tabby( this, options ));
            }
        });
    }

})(jQuery);