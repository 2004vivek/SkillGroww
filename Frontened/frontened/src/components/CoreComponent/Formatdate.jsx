export default function Formatdate(datestr) {
    const date = new Date(datestr);
    const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedDate = date.toLocaleString('en-US', options);
    return formattedDate;
}
