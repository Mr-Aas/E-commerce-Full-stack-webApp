import { useTranslation } from "react-i18next"

function Footer() {
  const { t } = useTranslation()
  return (
    <div className='footer flex justify-around items-center min-h-[40vh] bg-linear-to-r from-slate-900 to-black w-full text-slate-400 '>
      <div className="tags bg-slate-950">
        <ul className="grid grid-cols-2  gap-4 liststyle-none">
          <li className="tag hover:translate-x-2">{t("Home")}</li>
          <li className="tag hover:translate-x-2">{t("About")}</li>
          <li className="tag hover:translate-x-2">{t("what we do")}</li>
          <li className="tag hover:translate-x-2">{t("partners")}</li>
          <li className="tag hover:translate-x-2">{t("blogs")}</li>
          <li className="tag hover:translate-x-2">{t("Contact")}</li>
        </ul>
      </div>
      <div className="info">
        <h2>All Rights Reserved &copy; Aas Mohd.</h2>
        <p>this website is almost completed.</p>
      </div>

    </div>
  )
}

export default Footer
