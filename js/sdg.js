$(document).ready(function() {
  let selectedSdgArray = [];
  let tapped = false;

  $('.flip-card').flip({ trigger: 'manual' });

  $('.sdg').on('click', function(e) {
    const clickedSdg = $(this);
    const flipCard = clickedSdg.children('.flip-card');
    if (!tapped) {
      //if tap is not set, set up single tap
      tapped = setTimeout(function() {
        tapped = null;
        if (!flipCard.data('flip-model').isFlipped) {
          addOrRemoveSdg(selectedSdgArray, clickedSdg);
        }
      }, 300); //wait 300ms then run single click code
    } else {
      //tapped within 300ms of last tap. double tap
      clearTimeout(tapped); //stop single tap callback
      tapped = null;
      //If sdg is not selected, flip it
      const index = selectedSdgArray.indexOf(clickedSdg.data('sdg-id'));
      if (index === -1) {
        flipCard.flip('toggle');
      }
    }
    e.preventDefault();
  });

  $('#continue-button').click(() => {
    localStorage.setItem('sdg', selectedSdgArray);
    location.href = 'register.html';
  });
});

const addOrRemoveSdg = (selectedSdgArray, sdg) => {
  const sdgId = sdg.data('sdg-id');
  const index = selectedSdgArray.indexOf(sdgId);

  if (index === -1) {
    selectedSdgArray.push(sdgId);
    sdg.children('.sdg-overlay').show();
  } else {
    selectedSdgArray.splice(index, 1);
    sdg.children('.sdg-overlay').hide();
  }
  checkSelectedSdgCount(selectedSdgArray);
};

const checkSelectedSdgCount = selectedSdgArray => {
  if (selectedSdgArray.length >= 3) {
    $('#continue-button-sdg').show();

    $('#container-sdg').addClass('sdg-margin-bottom');
  } else {
    $('#continue-button-sdg').hide();
    $('#container-sdg').removeClass('sdg-margin-bottom');
  }
};
