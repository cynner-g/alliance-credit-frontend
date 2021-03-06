import Link from 'next/link'
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
const TabButton = ({ id, url }) => {
    const router = useRouter();
    id = Cookies.get('viewed_company_id');
    return (
        <ul className="nav company_nav">
            <li className="nav-item" className={router.pathname == "/companies/[id]" ? "active" : ""}><Link href={url}><a className="nav-link">General</a></Link></li>
            <li className="nav-item" className={router.pathname == "/companies/users/[userid]" ? "active" : ""}>
                <Link href={{
                    pathname: `/companies/users/[userid]`,
                    query: {
                        userid: id, // should be `title` not `id`
                    },
                }}
                    as={`/companies/users/${id}`}
                ><a className="nav-link">user</a>
                </Link></li>
            <li className="nav-item" className={router.pathname == "/legal-watchlist" ? "active" : ""}>
                <Link href={{
                    pathname: `/legal-watchlist`,
                    query: {
                        cid: id
                    },
                }} >

                    <a className="nav-link">Legal Watchlist</a>
                </Link></li >


            <li className="nav-item" className={router.pathname == "/aging" ? "active" : ""}>
                <Link href={{
                    pathname: `/aging`,
                    query: {
                        cid: id
                    },
                }} >

                    <a className="nav-link">Aging</a>
                </Link></li >
        </ul>
    )
}

export default TabButton