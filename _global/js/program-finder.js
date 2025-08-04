document.addEventListener(DOMContentLoaded, function () {
  const rawData = document.getElementById(programDataJson);
  if (!rawData) return;

  const data = JSON.parse(rawData.textContent);
  let filteredData = [...data];
  let currentPage = 0;
  const perPage = 10;

  const filterBar = document.getElementById(programFilterBar);
  const programList = document.getElementById(programList);
  const loadMoreBtn = document.getElementById(loadMoreBtn);

   Inject filter UI
  filterBar.innerHTML = `
    div class=row gx-3
      div class=input-first col-12 col-sm-6
        label for= class=form-label aria-label=Search for a degree by keywordSearch for a degree by keywordlabel
        input type=text class=form-control placeholder=Search for a degree by keyword id=searchBox aria-describedby=Search for a degree by keyword
      div
      div class=input-last col-12 col-sm-6
        label for= class=form-label aria-label=Browse by degree levelBrowse by degree levellabel
        select id=degreeDropdown class=form-select aria-label=Degrees
          option value=Browse by degree leveloption
          ${[...new Set(data.map(p = p.degree))].map(d = `option value=${d}${d}option`).join('')}
        select
      div
      div class=col-12
        div class=form-check
            input type=checkbox class=form-check-input id=onlineOnly
            label class=form-check-label text-medium for=exampleCheck1Show online degrees onlylabel
        div
      div
    div
  `;

   Filter logic
  function applyFilters() {
    const keyword = document.getElementById(searchBox).value.toLowerCase();
    const degree = document.getElementById(degreeDropdown).value;
    const onlineOnly = document.getElementById(onlineOnly).checked;

    filteredData = data.filter(p = {
        const matchKeyword =
            (p.title && p.title.toLowerCase().includes(keyword)) 
            (p.concentration && p.concentration.toLowerCase().includes(keyword));
        const matchDegree = degree  p.degree === degree  true;
        const matchModality = onlineOnly
           (typeof p.modality === string && p.modality.trim().toLowerCase() === online)
           true;
        return matchKeyword && matchDegree && matchModality;
    });

    currentPage = 0;
    programList.innerHTML = ;
    loadMore();
  }

   Load more logic (lazy loading)
  function loadMore(event) {
    if (event) event.preventDefault();  Prevent scroll to top

    const start = currentPage  perPage;
    const end = start + perPage;
    const items = filteredData.slice(start, end);

    items.forEach(p = {
      const item = document.createElement(a);
      item.href = p.link;
      item.target = p.target  _self;
      item.className = program-link text-decoration-none d-flex w-100 mb-2;

      let leftHTML = `h4${p.title}h4`;
      if (p.concentration && p.concentration.trim() !== ) {
        leftHTML += `p class=mb-0${p.concentration}p`;
      }

      let rightHTML = ;
      if (p.degree && p.degree.trim() !== ) {
        rightHTML += `p class=subtext fw-bold mb-0${p.degree}p`;
      }
      if (p.modality && p.modality.trim() !== ) {
        rightHTML += `p class=subtext m-0${p.modality}p`;
      }

      item.innerHTML = `
        div class=d-flex w-100
          div class=flex-1
            div class=row
              div class=left-program-link col-12 col-sm-6 mb-0
                ${leftHTML}
              div
              div class=right-program-link col-12 col-sm-6 d-flex justify-content-sm-end
                div class=p-0
                  ${rightHTML}
                div
              div
            div
          div
          div class=right-arrow-sec p-0
            div class=text-decoration-none btn btn-secondary p-0
              svg class=arrow xmlns=httpwww.w3.org2000svg width=24 height=25 viewBox=0 0 24 25 fill=none
                path d=M14 5.60693L12.5 7.10693L17.0703 11.6772H3V13.6772H17.0703L12.5 18.2476L14 19.7476L21.0703 12.6772L14 5.60693Z fill=currentColorpath
              svg
            div
          div
        div
      `;
      programList.appendChild(item);
    });

    currentPage++;
    loadMoreBtn.style.display = currentPage  perPage = filteredData.length  none  inline-block;
  }

   Event bindings
  document.getElementById(searchBox).addEventListener(input, applyFilters);
  document.getElementById(degreeDropdown).addEventListener(change, applyFilters);
  document.getElementById(onlineOnly).addEventListener(change, applyFilters);
  loadMoreBtn.addEventListener(click, loadMore);

   Initial load
  applyFilters();
});
