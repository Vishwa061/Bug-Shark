const getViewStyle = (viewType) => {
    const isGalleryView = viewType === "gallery";

    const l1Style = isGalleryView ? null : {
        width: "100%",
        display: "inline-block",
        marginBottom: "2vw",
        marginRight: "0"
    }

    const l2Style = isGalleryView ? null : {
        float: "left",
        width: "22vw",
        borderTopRightRadius: "0",
        borderBottomLeftRadius: "2vw",
        paddingLeft: "1vw"
    }

    const l3Style = isGalleryView ? null : {
        paddingBottom: "2vw",
        float: "left"
    }

    const l4Style = isGalleryView ? null : {
        float: "left",
        width: "50vw",
        borderTopRightRadius: "2vw",
        borderBottomLeftRadius: "0",
        paddingBottom: "2vw"
    }

    const l5Style = isGalleryView ? null : {
        float: "left",
        width: "max-content",
        marginLeft: "4vw"
    }

    return {
        l1Style: l1Style,
        l2Style: l2Style,
        l3Style: l3Style,
        l4Style: l4Style,
        l5Style: l5Style
    }
}

export default getViewStyle;