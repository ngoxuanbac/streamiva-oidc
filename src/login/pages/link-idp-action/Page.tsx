import { Button } from "@/components/ui/button";
import { useI18n } from "@/login/i18n";
import { useKcContext } from "@/login/KcContext";
import { assert } from "tsafe/assert";
import { Template } from "../../components/Template";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "link-idp-action.ftl");

    const { msg, msgStr } = useI18n();

    return (
        <Template
            headerNode={
                <div className="text-center">
                    <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
                        {msg("linkIdpActionTitle", kcContext.idpDisplayName)}
                    </p>
                </div>
            }
            displayMessage={false}
        >
            <div id="kc-link-text">
                {msg("linkIdpActionMessage", kcContext.idpDisplayName)}
            </div>
            <form action={kcContext.url.loginAction} method="post">
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-between mt-6">
                    <Button
                        name="cancel-aia"
                        variant="outline"
                        className="flex-1"
                        id="kc-cancel"
                        type="submit"
                    >
                        {msgStr("doCancel")}
                    </Button>
                    <Button
                        name="continue"
                        id="kc-continue"
                        type="submit"
                        className="flex-1 bg-[#5e17eb] hover:bg-[#4a12bc] text-white font-medium"
                    >
                        {msgStr("doContinue")}
                    </Button>
                </div>
            </form>
            <div className="clearfix" />
        </Template>
    );
}
