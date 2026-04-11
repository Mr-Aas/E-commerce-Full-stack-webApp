import { useTranslation } from "react-i18next"

function Footer() {
  const { t } = useTranslation()
  return (
    <div className='footer flex justify-around items-center min-h-[40vh] bg-linear-to-r from-slate-900 to-black w-full text-slate-400 '>
      <div className="tags bg-slate-950">
        <ul className="liststyle-none">
          <li className="tag">{t("Home")}</li>
          <li className="tag">{t("About")}</li>
          <li className="tag">{t("what we do")}</li>
          <li className="tag">{t("partners")}</li>
          <li className="tag">{t("blogs")}</li>
          <li className="tag">{t("Contact")}</li>
        </ul>
      </div>
      <div className="info">
        <h2>All Rights Reserved &copy;</h2>
        <p>this website is underconstruction</p>
      </div>

    </div>
  )
}

export default Footer
