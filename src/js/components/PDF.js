import React from 'react'
import PDFViewer from 'pdf-viewer-reactjs'

const PDFView = (props) => {
    return (
        <PDFViewer
            document={{
                url: props.url,
            }}
        />
    )
}

export default PDFView