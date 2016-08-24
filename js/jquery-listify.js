(function ($) {
    var listificationIncrement = -1;
    var nextListificationIncrement = 0;
    $.fn.listify = function(self) {
        listificationIncrement++;

        if(this.attr("data-listifyRootHtmlElementNo") !== undefined){
            if(listificationIncrement > parseInt(this.attr("data-listifyRootHtmlElementNo")))
                nextListificationIncrement = listificationIncrement;

            listificationIncrement = this.attr("data-listifyRootHtmlElementNo");
        }
        else{
            if(nextListificationIncrement != 0)
                listificationIncrement = nextListificationIncrement;
        }

        $('[data-listifyHtmlElementNo="'+listificationIncrement+'"]').remove();

        this.css("display", "none");

        listifyCondition = (self === undefined);
        listifyCondition = (!listifyCondition) ? (listifyCondition ||(self.listifyArrayObject.length > 0)) : false ;

        if(listifyCondition){
            cloneElement = [];
            this.attr("data-listifyRootHtmlElementNo",listificationIncrement);
            for (var i = 0; i < self.listifyArrayObject.length; i++) {
                cloneElement[i] = this.clone().removeAttr('id').css( "display", "block" ).attr("data-listifyHtmlElementNo",listificationIncrement);
                cloneElement[i].find('[data-value-exist="true"]').each(function(){
                    key = $(this).data('key');
                    if($(this).prop('tagName') != 'INPUT')
                        $(this).html(self.listifyArrayObject[i][key]);
                    else{
                        if($(this).attr('type') != 'button'){
                            $(this).val(self.listifyArrayObject[i][key]);
                            $(this).data($(this).data('key'),self.listifyArrayObject[i][key]);

                            if($(this).attr('type') == 'checkbox')
                                $(this).attr('checked',self.listifyArrayObject[i][key]);
                        }
                        else{
                            $(this).data($(this).data('key'),self.listifyArrayObject[i][key]);
                        }
                    }
                });
                cloneElement[i].insertAfter(this);
            };
        }
        if(self !== undefined){
            if (self.success !== undefined){
                self.allElements = $('[data-listifyHtmlElementNo="'+listificationIncrement+'"]');
                self.success();
            }
        }
        return this;
    };
}(jQuery));