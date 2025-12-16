        var files

        function handleFileSelectMulti(maxQuantityPhotos, toPlace) {

          if (files.length > 0) {
            toPlace.innerHTML = ''
          }

          for (var i = 0, f; f = files[i]; i++) {
            if (files.length > maxQuantityPhotos) {
              alert("Вы можете загрузить не более " + maxQuantityPhotos + " фотографий");
              return false;
            }

            if (!f.type.match('image.*')) {
              alert("Только изображения....");
            }

            var reader = new FileReader();

            reader.onload = (function (theFile) {
              return function (e) {
                var span = document.createElement('span');
                span.classList.add('users-photo');
                span.innerHTML = ['<img width="100" class="img-thumbnail" src="', e.target.result,
              '" title="', escape(theFile.name), '"/> <button type="button" class="button delete-photo">'
            ].join('');
                toPlace.insertBefore(span, null);
              };
            })(f);

            reader.readAsDataURL(f);
          }
        }


        document.onclick = function (evt) {
          var photoEl = evt.target

          if (photoEl.dataset.photo == 'multi') {
            photoEl.onchange = function (evt) {
              files = evt.target.files
              var place = document.querySelector('.photos')
              handleFileSelectMulti(10, place)
            }
          } else if (photoEl.dataset.photo == 'one') {
            photoEl.onchange = function (evt) {
              files = evt.target.files
              var place = document.querySelector('.file-image')
              handleFileSelectMulti(1, place)
            }
          } else if (photoEl.dataset.photo == 'single') {
            photoEl.onchange = function (evt) {
              files = evt.target.files
              var place = photoEl.parentNode.querySelector('.photos')
              handleFileSelectMulti(1, place)
            }
          } else if (photoEl.dataset.photo == 'three') {
            photoEl.onchange = function (evt) {
              files = evt.target.files
              var place = photoEl.parentNode.querySelector('.photos')
              handleFileSelectMulti(3, place)
            }
          }
        }

        $(document).on("click", ".delete-photo", function (evt) {
          evt.preventDefault()
          $(this).parent(".users-photo").remove()
          $("#photo").val("")
          return false
        })
