import { Button } from "@/components/ui/button";
import { useI18n } from "@/login/i18n";
import { useKcContext } from "@/login/KcContext";
import { assert } from "tsafe/assert";
import { Template } from "../../components/Template";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "login-idp-link-confirm.ftl");

    const { msg } = useI18n();

    return (
        <Template
            headerNode={
                <div className="text-center">
                    <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
                        {msg("confirmLinkIdpTitle")}
                    </p>
                </div>
            }
        >
            <form id="kc-register-form" action={kcContext.url.loginAction} method="post">
                <div className="flex flex-col gap-4">
                    <Button
                        type="submit"
                        className="w-full"
                        variant="outline"
                        name="submitAction"
                        id="updateProfile"
                        value="updateProfile"
                    >
                        {msg("confirmLinkIdpReviewProfile")}
                    </Button>
                    <Button
                        type="submit"
                        className="w-full bg-[#5e17eb] hover:bg-[#4a12bc] text-white font-medium"
                        name="submitAction"
                        id="linkAccount"
                        value="linkAccount"
                    >
                        {msg("confirmLinkIdpContinue", kcContext.idpAlias)}
                    </Button>
                </div>
            </form>
        </Template>
    );
}
