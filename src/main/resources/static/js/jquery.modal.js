/* 
    html 弹出框中的内容
    url Object
        base 最终提交的url
        edit 编辑url
        type 提交方式
        control 'edit'
        data 要传递的数据

*/
$.extend({
    modal: function (opt) {
        var html = opt.html
        var url = opt.url.base
        var editUrl = opt.url.edit
        var control = opt.control
        var data = opt.data
        var $modal = $(`
            <div class="modal fade in show" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default modal-close" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary submit">Save changes</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->
        `)
        $body = $modal.find('.modal-body')
        $body.html(html)
        $('body').append($modal)
        $form = $modal.find('form')
        $submit = $modal.find('.submit')

        if (control === 'edit') {
            var unindexed_array = $form.serializeArray();
            var indexed_array = {};
        
            $.map(unindexed_array, function (n, _i) {
              indexed_array[n['name']] = n['value'];
            });

            $.ajax({
                url: editUrl, 
                data: indexed_array,
                success: function (res) {
                    console.log(res)
                    for (var key in res) {
                        $('[name= "' + key + '"]').val(res[key])
                    }
                }
            })
        }
        $modal.find('.modal-close').on('click', function () {
            $modal.remove()
        })
        $submit.on('click', function () {
            $.post(url, $form.serialize(), function (res) {
                console.log('成功')
                $modal.remove()
            })
        })

    
    }
})

/* $.fn.modal = function (opt) {
    

    return this.each(function () {
        $(this).addEventListener('click', showModal)
    })
 
    


    
} */