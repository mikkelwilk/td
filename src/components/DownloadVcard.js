import { saveAs } from "file-saver";
import "../style.css";
function DownloadVcard(props) {
  function handleClick() {
    var vCardsJS = require("vcards-js");
    var fileDownload = require("js-file-download");
    var vCard = vCardsJS();
    vCard.firstName = props.profile.fullName.split(" ").slice(0, -1).join(" ");
    vCard.lastName = props.profile.fullName.split(" ").slice(-1).join(" ");
    vCard.url = window.location.href;
    vCard.photo.embedFromString(
      props.profile.profilePhoto.split(",").slice(-1).join(",")
    );
    vCard.note = props.profile.bio;
    var content = vCard.getFormattedString();
    var fileName = "vcard.vcf";
    var blob = new Blob([content], {
      type: "text/vcard",
    });
    saveAs(blob, fileName);
  }
  return (
    <button
      className="DownloadVcard"
      style={{
        backgroundColor: props.profile.accent,
      }}
      onClick={handleClick}
    >
      Download Contact
    </button>
  );
}
export default DownloadVcard;
