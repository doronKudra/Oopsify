import { useLayoutEffect, useRef } from 'react'

export function ContextMenu({ actions, context, position, onClose }) { // dynamic in the future actions: [{id,name,callback},context?,onClose]
    const color = ['#656565','#107434']
    const menuRef = useRef(null)

    useLayoutEffect(() => {
        if (!menuRef.current) return
    }, [])

    function onSelectMenuItem(cb) {
        cb(context)
        onClose()
    }

    function transformToSvg(icon = ''){ // returns empty if undefined
        switch(icon){
            case 'remove':
                return (<svg role="img" aria-hidden="true" className="menu-icon menu-icon-green menu-icon-remove" viewBox="0 0 16 16" ><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m11.748-1.97a.75.75 0 0 0-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 1 0-1.061 1.06l2.466 2.467 5.53-5.53z"></path></svg>)
            case 'save':
                return (<svg role="img" aria-hidden="true" className="menu-icon menu-icon-save" viewBox="0 0 16 16" ><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"></path><path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75"></path></svg>)
            case 'add':
                return (<svg role="img" aria-hidden="true" className="menu-icon menu-icon-add" viewBox="0 0 16 16" ><path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75"></path></svg>)
            case 'queue':
                return (<svg role="img" aria-hidden="true" className="menu-icon menu-icon-queue" viewBox="0 0 16 16" ><path d="M16 15H2v-1.5h14zm0-4.5H2V9h14zm-8.034-6A5.5 5.5 0 0 1 7.187 6H13.5a2.5 2.5 0 0 0 0-5H7.966c.159.474.255.978.278 1.5H13.5a1 1 0 1 1 0 2zM2 2V0h1.5v2h2v1.5h-2v2H2v-2H0V2z"></path></svg>)
            case 'profile':
                return (<svg role="img" aria-hidden="true" className="menu-icon menu-icon-profile" viewBox="0 0 16 16" ><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M1.5 8a6.5 6.5 0 1 1 11.395 4.277 3.5 3.5 0 0 0-1.163-1.088l-1.523-.88a.285.285 0 0 1-.076-.428l.086-.104v-.001c.549-.654.962-1.449 1.02-2.422.03-.526-.055-1.074-.165-1.395a3.2 3.2 0 0 0-.671-1.154 3.26 3.26 0 0 0-4.806 0 3.2 3.2 0 0 0-.672 1.154c-.109.32-.195.87-.163 1.395.057.973.47 1.768 1.018 2.422l.087.105a.285.285 0 0 1-.076.428l-1.523.88a3.5 3.5 0 0 0-1.163 1.088A6.48 6.48 0 0 1 1.5 8m2.74 5.302c.173-.334.44-.62.778-.814l1.523-.88A1.784 1.784 0 0 0 7.02 8.92l-.088-.105-.002-.002c-.399-.476-.637-.975-.671-1.548a2.7 2.7 0 0 1 .087-.824 1.7 1.7 0 0 1 .357-.623 1.76 1.76 0 0 1 2.594 0q.232.255.357.623a2.7 2.7 0 0 1 .087.824c-.034.573-.272 1.072-.671 1.548l-.002.002-.088.105c-.709.85-.48 2.135.479 2.688l1.523.88c.338.195.605.48.779.814A6.47 6.47 0 0 1 8 14.5a6.47 6.47 0 0 1-3.76-1.198"></path></svg>)
            case 'search':
                return (<svg role="img" aria-hidden="true" className="menu-icon menu-icon-search" viewBox="0 0 16 16" ><path d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5M.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.2A6.75 6.75 0 0 1 .25 7"></path></svg>)
            case 'copy':
                return (<svg role="img" aria-hidden="true" className="menu-icon menu-icon-copy" viewBox="0 0 16 16"  ><path d="M5 .75A.75.75 0 0 1 5.75 0h9.5a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75H12v-1.5h2.5v-9h-8V3H5z"></path><path d="M.75 4a.75.75 0 0 0-.75.75v10.5c0 .414.336.75.75.75h9.5a.75.75 0 0 0 .75-.75V4.75a.75.75 0 0 0-.75-.75zm.75 10.5v-9h8v9z"></path></svg>)
            case 'folder':
                return (<svg role="img" aria-hidden="true" className="menu-icon menu-icon-folder" viewBox="0 0 16 16" ><path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v11.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0 0 16 14.25v-9.5A1.75 1.75 0 0 0 14.25 3H7.82l-.65-1.125A1.75 1.75 0 0 0 5.655 1zM1.5 2.75a.25.25 0 0 1 .25-.25h3.905a.25.25 0 0 1 .216.125L6.954 4.5h7.296a.25.25 0 0 1 .25.25v9.5a.25.25 0 0 1-.25.25H1.75a.25.25 0 0 1-.25-.25z"></path></svg>)
            case 'share':
                return (<svg role="img" aria-hidden="true" className="menu-icon menu-icon-share" viewBox="0 0 16 16" ><path d="M1 5.75A.75.75 0 0 1 1.75 5H4v1.5H2.5v8h11v-8H12V5h2.25a.75.75 0 0 1 .75.75v9.5a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75z"></path><path d="M8 9.576a.75.75 0 0 0 .75-.75V2.903l1.454 1.454a.75.75 0 0 0 1.06-1.06L8 .03 4.735 3.296a.75.75 0 0 0 1.06 1.061L7.25 2.903v5.923c0 .414.336.75.75.75"></path></svg>)
            case 'radio':
                return (<svg role="img" aria-hidden="true" className="menu-icon menu-icon-radio" viewBox="0 0 16 16"  ><path d="M5.624 3.886A4.75 4.75 0 0 0 3.25 8c0 1.758.955 3.293 2.375 4.114l.75-1.3a3.249 3.249 0 0 1 0-5.63l-.75-1.298zm4.001 1.299.75-1.3A4.75 4.75 0 0 1 12.75 8a4.75 4.75 0 0 1-2.375 4.114l-.75-1.3a3.249 3.249 0 0 0 0-5.63zM8 6.545a1.455 1.455 0 1 0 0 2.91 1.455 1.455 0 0 0 0-2.91"></path><path d="M4 1.07A8 8 0 0 0 0 8a8 8 0 0 0 4 6.93l.75-1.3A6.5 6.5 0 0 1 1.5 8a6.5 6.5 0 0 1 3.25-5.63zm7.25 1.3.75-1.3A8 8 0 0 1 16 8a8 8 0 0 1-3.999 6.93l-.75-1.3A6.5 6.5 0 0 0 14.5 8a6.5 6.5 0 0 0-3.25-5.63"></path></svg>)
            case 'edit':
                return (<svg role="img" aria-hidden="true" className="menu-icon menu-icon-edit" viewBox="0 0 16 16" ><path d="M11.838.714a2.438 2.438 0 0 1 3.448 3.448l-9.841 9.841c-.358.358-.79.633-1.267.806l-3.173 1.146a.75.75 0 0 1-.96-.96l1.146-3.173c.173-.476.448-.909.806-1.267l9.84-9.84zm2.387 1.06a.94.94 0 0 0-1.327 0l-9.84 9.842a1.95 1.95 0 0 0-.456.716L2 14.002l1.669-.604a1.95 1.95 0 0 0 .716-.455l9.841-9.841a.94.94 0 0 0 0-1.327z"></path></svg>)
            case 'delete':
                return (<svg role="img" aria-hidden="true" className="menu-icon menu-icon-delete" viewBox="0 0 16 16" ><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"></path><path d="M12 8.75H4v-1.5h8z"></path></svg>)
            case 'artist':
                return (<svg role="img" aria-hidden="true" className="menu-icon menu-icon-artist" viewBox="0 0 16 16" ><path d="M11.757 2.987A4.36 4.36 0 0 0 7.618 0a4.36 4.36 0 0 0-4.139 2.987 5.5 5.5 0 0 0-.22 1.894 5.6 5.6 0 0 0 1.4 3.312l.125.152a.748.748 0 0 1-.2 1.128l-2.209 1.275A4.75 4.75 0 0 0 0 14.857v1.142h8.734A5.5 5.5 0 0 1 8.15 14.5H1.517a3.25 3.25 0 0 1 1.6-2.454l2.21-1.275a2.25 2.25 0 0 0 .6-3.386l-.128-.153a4.1 4.1 0 0 1-1.05-2.44A4 4 0 0 1 4.89 3.47a2.8 2.8 0 0 1 1.555-1.713 2.89 2.89 0 0 1 3.293.691c.265.296.466.644.589 1.022.12.43.169.876.144 1.322a4.12 4.12 0 0 1-1.052 2.44l-.127.153a2.24 2.24 0 0 0-.2 2.58c.338-.45.742-.845 1.2-1.173 0-.162.055-.32.156-.447l.126-.152a5.6 5.6 0 0 0 1.4-3.312 5.5 5.5 0 0 0-.218-1.894zm3.493 3.771a.75.75 0 0 0-.75.75v3.496h-1a2.5 2.5 0 0 0-2.31 1.542 2.497 2.497 0 0 0 1.822 3.406A2.502 2.502 0 0 0 16 13.502V7.508a.75.75 0 0 0-.75-.75m-.75 6.744a.998.998 0 0 1-1.707.707 1 1 0 0 1 .707-1.706h1z"></path></svg>)
            case 'unpin':
                return (<svg role="img" aria-hidden="true" className="menu-icon menu-icon-green menu-icon-unpin" viewBox="0 0 16 16" ><path d="M8.822.797a2.72 2.72 0 0 1 3.847 0l2.534 2.533a2.72 2.72 0 0 1 0 3.848l-3.678 3.678-1.337 4.988-4.486-4.486L1.28 15.78a.75.75 0 0 1-1.06-1.06l4.422-4.422L.156 5.812l4.987-1.337z"></path></svg>)
            case 'pin':
                return (<svg role="img" aria-hidden="true" className="menu-icon menu-icon-pin" viewBox="0 0 16 16" ><path d="M11.609 1.858a1.22 1.22 0 0 0-1.727 0L5.92 5.82l-2.867.768 6.359 6.359.768-2.867 3.962-3.963a1.22 1.22 0 0 0 0-1.726zM8.822.797a2.72 2.72 0 0 1 3.847 0l2.534 2.533a2.72 2.72 0 0 1 0 3.848l-3.678 3.678-1.337 4.988-4.486-4.486L1.28 15.78a.75.75 0 0 1-1.06-1.06l4.422-4.422L.156 5.812l4.987-1.337z"></path></svg>)
            case 'new-playlist':
                return (<svg role="img" aria-hidden="true" className="menu-icon menu-icon-new-playlist" viewBox="0 0 16 16" ><path d="M2 0v2H0v1.5h2v2h1.5v-2h2V2h-2V0zm11.5 2.5H8.244A5.5 5.5 0 0 0 7.966 1H15v11.75A2.75 2.75 0 1 1 12.25 10h1.25zm0 9h-1.25a1.25 1.25 0 1 0 1.25 1.25zM4 8.107a5.5 5.5 0 0 0 1.5-.593v5.236A2.75 2.75 0 1 1 2.75 10H4zM4 11.5H2.75A1.25 1.25 0 1 0 4 12.75z"></path></svg>)
            case 'new-playlist-big':
                return (<svg role="img" aria-hidden="true" className="big-menu-icon menu-icon-new-playlist" viewBox="0 0 24 24"><path d="M3 8V5H0V3h3V0h2v3h3v2H5v3zm8-4q0 .51-.07 1H19v9.667h-1.5a3.5 3.5 0 1 0 3.5 3.5V3H10.93q.07.49.07 1m8 12.667v1.5a1.5 1.5 0 1 1-1.5-1.5zM6 10.71a7 7 0 0 0 2-.965v8.422a3.5 3.5 0 1 1-3.5-3.5H6zm0 5.957H4.5a1.5 1.5 0 1 0 1.5 1.5z"></path></svg>)
            case 'folder-big':
                return (<svg role="img" aria-hidden="true" className="big-menu-icon menu-icon-folder" viewBox="0 0 24 24"><path d="M1 4a2 2 0 0 1 2-2h5.155a3 3 0 0 1 2.598 1.5l.866 1.5H21a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2zm7.155 0H3v16h18V7H10.464L9.021 4.5a1 1 0 0 0-.866-.5"></path></svg>)
            case 'private':
                return (<svg role="img" aria-hidden="true" className="menu-icon menu-icon-private" viewBox="0 0 16 16" ><path d="M4 4a4 4 0 1 1 8 0v3h1.25c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 13.25 16H2.75A1.75 1.75 0 0 1 1 14.25v-5.5C1 7.784 1.784 7 2.75 7H4zm1.5 3h5V4a2.5 2.5 0 0 0-5 0zM2.75 8.5a.25.25 0 0 0-.25.25v5.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25z"></path></svg>)
            case 'album':
                return (<svg role="img" aria-hidden="true" className="menu-icon menu-icon-album" viewBox="0 0 16 16" ><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"></path><path d="M8 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M5 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0"></path></svg>)
            default:
                return
        }
    }

    if (!actions?.length) return
    return (<div className="context-menu">
        <div onMouseDown={onClose} className="context-menu-backdrop"></div>
        <div onClick={ev => ev.stopPropagation()} style={{ position: 'fixed', top: position.y, left: position.x}} className="context-menu-content">
            <ul>
                {actions.map(action =>
                    (action.name && <li key={action._id}>
                        <button className="context-menu-option" style={{ borderBottom: action.border ? '1px solid #3e3e3e' : ''}} onClick={() => onSelectMenuItem(action.callback)}>
                            {transformToSvg(action.icon)}
                            <span>{action.name}</span>
                            </button>
                    </li>))
                }
            </ul>
        </div>
    </div>)
}