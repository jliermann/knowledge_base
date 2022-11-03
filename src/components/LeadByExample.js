import React,{ useState } from "react";
import { useLocation } from "react-router-dom"

var lbeTable = require('@site/static/assets/lbe.json');

function MultiUrl( {name,url} ) {
  return (
    <button className="lbe_button">
      <a href={url} target="_blank">{name}</a>
    </button>
  )
}

export default function Lbe( {useCategoriesList} ) {

  // Get URL params

  const location = useLocation()
  const queryParameters = new URLSearchParams(location.search);
  const queryText = queryParameters.get("text");
  const queryTag = queryParameters.get("tag");
  const querySubd = queryParameters.get("subdisc");

  var tagDefault = "";
  var subdDefault = "";
  var journalDefault = "";
  var textDefault = "";
  var switchDefault = "subd";
  
  if ( queryTag !== null ) {
    tagDefault = queryTag;
  }
  else if ( queryText !== null ) {
    textDefault = queryText;
    tagDefault = "";
    switchDefault = "text"
  }
  else {
    tagDefault = "All";
    subdDefault = "All";
    journalDefault = "All";
  }

  // Define React states for filtering

  const [tagFilter, setTagFilter] = useState(tagDefault);
  const [subdFilter, setSubdFilter] = useState(subdDefault);
  const [journalFilter, setJournalFilter] = useState(journalDefault);
  const [searchFilter, setSearchFilter] = useState(textDefault);
  const [filterSwitch, setFilterSwitch] = useState(switchDefault);

  // Handles text input

  const handleChange = e => {setSearchFilter(e.target.value); setSubdFilter(""); setTagFilter(""); setJournalFilter(""); setFilterSwitch("text")};

  // Get list of subdisciplines

  var subdiscs = Array.from(new Set(lbeTable.map(obj => obj.subdiscipline).flat())).sort();
  subdiscs.unshift("All"); // Add "All" option at the beginning

  // Get list of tags

  var categories = Array.from(new Set(lbeTable.map(obj => obj.tags).flat())).sort();
  categories.unshift("All"); // Add "All" option at the beginning
  
  // Get list of journals
  
  var journals = Array.from(new Set(lbeTable.map(obj => obj.journal))).sort();
  journals.unshift("All"); // Add "All" option at the beginning

  // Function for Tag filter buttons

  function TagButton( { name } ) {

    var buttonClass = "lbe_tag lbe_tag_secondary";
    var number = 0;

    // Styling of active button

    if (name == tagFilter) {  
      buttonClass = "lbe_tag lbe_tag_active";
    }

    // Show number of items

    if (name == "All") {
      number = lbeTable.length;
    } else {
      number = lbeTable.filter(m => m.tags.includes(name)).length;
    }

    return (
        <button 
            className={buttonClass}
            onClick={() => {
              if (name == "All") {
                setJournalFilter("All"); setSubdFilter("All"); setTagFilter("All"); setSearchFilter(""); setFilterSwitch("subd")}
              else {
                setJournalFilter(""); setSubdFilter(""); setTagFilter(name); setSearchFilter(""); setFilterSwitch("tag")
              }
            }}
          >
            {name} ({number})
        </button>
    )
  }

  function SubdButton( { name } ) {

    var buttonClass = "lbe_tag";
    var number = 0;

    // Styling of active button

    if (name == subdFilter) {
      buttonClass = "lbe_tag lbe_tag_active";
    }

    // Show number of items

    if (name == "All") {
      number = lbeTable.length;
    } else {
      number = lbeTable.filter(m => m.subdiscipline.includes(name)).length;
    }

    return (
        <button 
            className={buttonClass}
            onClick={() => {
              if (name == "All") {
                setJournalFilter("All"); setSubdFilter("All"); setTagFilter("All"); setSearchFilter(""); setFilterSwitch("subd")}
              else {
                setJournalFilter(""); setSubdFilter(name); setTagFilter(""); setSearchFilter(""); setFilterSwitch("subd")
              }
            }} 
        >
            {name} ({number})
        </button>
    )
}

  // Function for Journal filter buttons

  function JournalButton( { name } ) {

    var buttonClass = "lbe_tag";
    var number = 0;

    if (name == journalFilter) {
      buttonClass = "lbe_tag lbe_tag_active";
    }

    // Show number of items

    if (name == "All") {
      number = lbeTable.length;
    } else {
      number = lbeTable.filter(m => m.journal.includes(name)).length;
    }

    return (
        <button 
            className={buttonClass}
            onClick={() => {
              if (name == "All") {
                setJournalFilter("All"); setSubdFilter("All"); setTagFilter("All"); setSearchFilter(""); setFilterSwitch("subd")}
              else {
                setJournalFilter(name); setSubdFilter(""); setTagFilter(""); setSearchFilter(""); setFilterSwitch("journal")
              }}
            }>
            {name} ({number})
        </button>
    )
  }

  // Function for single lbe dataset block

  function Lbeblock( {title, authors, journal, pubyear, linkpub, linkdata, linkcomment, description, tags, subdiscipline } ) {

  var doi = linkpub.slice(linkpub.indexOf("doi.org")+8); // Extract DOI from link by cutting right of "doi.org"

    return (
      <div className="block_lbe">
        <div className="header_lbe">
          <div className="header_lbe_title"><h3>{title}</h3>
          </div>
            <p><em>{authors}</em>
            </p>
            <p><em>{journal}</em> <strong>{pubyear}</strong>, DOI: <a href={linkpub} target="_blank">{doi}</a>.</p>

          <div className="header_lbe_link"><MultiUrl name="Permalink" url={"./?text=".concat(doi)} /></div>
        </div>

        <p>{subdiscipline.map((tag,idx) => 
          <SubdButton key={idx} name={tag} />
        )}</p>

        <details className="details_lbe">

          <summary>Details</summary>

          <div className="collapsible_lbe">

            <h4>Description</h4>

            <p>{description}</p>

            <h4>Link(s) to dataset(s)</h4>

            <p>
              {linkdata.map((props, idx) => (
                <MultiUrl key={idx} {...props} />
              ))}
            </p>
            <p><em>{linkcomment}</em></p>

          </div>        
        </details>
      </div>
    );
  }

  // Assemble buttons for filtering section

  function LbeButtons() {
    return(
      <>
        <div className="filter_lbe"><h4><br></br>Filter by subdisciplines</h4>
          <p>{subdiscs.map((props, idx) => <SubdButton key={idx} name={props} />)}</p>
        </div>
        <div className="filter_lbe"><h4>Filter by journals</h4>
          <p>{journals.map((props, idx) => <JournalButton key={idx} name={props} />)}</p>
        </div>
      </>
    )
  }

  // Render LBE section

  function LbeRender( { list } ) {
    return(
      <>
        {list.map((props, idx) => (
          <Lbeblock key={idx} {...props} />
        ))}
      </>
    )
  }

  // Render all datasets if "All" is selected

  if (tagFilter == "All" || subdFilter == "All") {
    return(
      <div className="lbe">
        <div className="col-searchfilter">
          <div className="block_lbe-search">
            <div className="search_lbe">
              <input className="navbar__search-input" placeholder="Type to search" value={searchFilter} onChange={handleChange} />
            </div>
            <LbeButtons />
          </div>
        </div>
        <div className="body_lbe"><LbeRender list={lbeTable} /></div> 
      </div>
    )
  }

  // Determine result set based on filterSwitch states

  var result = [];

  switch ( filterSwitch ) {
    case "tag":
      result = lbeTable.filter(n => n.tags.includes(tagFilter));
      break;
    case "subd":
      result = lbeTable.filter(n => n.subdiscipline.includes(subdFilter));
      break;
    case "journal":
      result = lbeTable.filter(n => n.journal.includes(journalFilter));
      break;
    case "text":
      result = lbeTable.filter(obj => JSON.stringify(obj).toLowerCase().includes(searchFilter.toLowerCase()));   // Squash object with JSON.stringify() for better searchability
      break;
  }
  
  return (
    <div className="lbe">
      <div className="col-searchfilter">
        <div className="block_lbe-search">
            <div className="search_lbe">
              <input className="navbar__search-input" placeholder="Type to search" value={searchFilter} onChange={handleChange} />
            </div>
            <LbeButtons />
        </div>
      </div>
      <div className="body_lbe"><LbeRender list={result} /></div> 
    </div>
  )
}

