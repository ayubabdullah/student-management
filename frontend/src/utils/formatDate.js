const formatDate = (date) => {
    const formatted = date.slice(0, date.indexOf('T'));
    return formatted;
}

export default formatDate;