import { assert } from "tsafe/assert";
import { useI18n } from "../../i18n";
import { useKcContext } from "../../KcContext";

export function Info() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "login.ftl");

    const { url } = kcContext;

    const { msg } = useI18n();

    return (
        <div id="kc-registration-container">
            <div id="kc-registration" className="text-gray-700 dark:text-gray-300">
                <span className="space-x-1">
                    {msg("noAccount")}
                    <a
                        className="text-[#5e17eb] hover:text-[#4a12bc] font-medium"
                        tabIndex={8}
                        href={url.registrationUrl}
                    >
                        {msg("doRegister")}
                    </a>
                </span>
            </div>
        </div>
    );
}
