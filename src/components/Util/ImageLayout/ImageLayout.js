import './ImageLayout.css';

const mediaFile = (imgLink) => {
    switch (imgLink.type) {
        case 'image': case 'gif':
            return <img key={imgLink._id} src={imgLink.name} alt={imgLink.name} />
            
        case 'video':
            return  <video width="320" height="240" controls>
            <source src={imgLink.name} type="video/mp4" />
            <source src={imgLink.name} type="video/ogg" />
            Your browser does not support the video tag.
          </video> 

        default:
            return <img key={imgLink._id} src={imgLink.name} alt={"Cannot display file"} />
    }
}

export const SingleImageLayout = (props) => {
    const {postImgLink} = props;
    return <div className="image-layout-single">
        <span className="image-container image-layout-single-first">{mediaFile(postImgLink[0])}</span>
    </div>
}

export const DoubleImageLayout = (props) => {
    const {postImgLink} = props;
    return <div className="image-layout-double">
        <span className=" image-container image-layout-double-first">{mediaFile(postImgLink[0])}</span>
        <span className=" image-container image-layout-double-second">{mediaFile(postImgLink[1])}</span>
    </div>
}

export const TripleImageLayout = (props) => {
    const {postImgLink} = props;
    return <div className="image-layout-triple">
        <span className=" image-container image-layout-triple-first">{mediaFile(postImgLink[0])}</span>
        <span className=" image-container image-layout-triple-second">{mediaFile(postImgLink[1])}</span>
        <span className=" image-container image-layout-triple-third">{mediaFile(postImgLink[2])}</span>
    </div>
}

export const QuadImageLayout = (props) => {
    const {postImgLink} = props;
    return <div className="image-layout-quad">
        <span className=" image-container image-layout-quad-first">{mediaFile(postImgLink[0])}</span>
        <span className=" image-container image-layout-quad-second">{mediaFile(postImgLink[1])}</span>
        <span className=" image-container image-layout-quad-third">{mediaFile(postImgLink[2])}</span>
        <span className=" image-container image-layout-quad-fourth">{mediaFile(postImgLink[3])}</span>
    </div>
}

export const ImageScroll = (props) => {
    const {postImgLink} = props;
    console.log(postImgLink)
    return <div className="image-layout-scroll">
        {/* {
            postImgLink.map(item => <span>{mediaFile(item)}</span>)
        } */}
    </div>
}