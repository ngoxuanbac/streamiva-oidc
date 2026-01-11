import { Button } from "@/components/ui/button";
import { useI18n } from "@/login/i18n";
import { useKcContext } from "@/login/KcContext";
import { assert } from "tsafe/assert";
import { Template } from "../../components/Template";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "logout-confirm.ftl");

    const { url, client, logoutConfirm } = kcContext;

    const { msg, msgStr } = useI18n();
    return (
        <Template
            headerNode={
                <div className="text-center">
                    <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
                        {msg("logoutConfirmTitle")}
                    </p>
                </div>
            }
        >
            <div className="space-y-4">
                <p className="text-foreground ">{msg("logoutConfirmHeader")}</p>

                <form
                    className="space-y-6"
                    action={url.logoutConfirmAction}
                    method="POST"
                >
                    <input type="hidden" name="session_code" value={logoutConfirm.code} />

                    <Button
                        tabIndex={4}
                        className="w-full bg-[#5e17eb] hover:bg-[#4a12bc] text-white font-medium"
                        name="confirmLogout"
                        id="kc-logout"
                        type="submit"
                    >
                        {msgStr("doLogout")}
                    </Button>
                </form>

                {!logoutConfirm.skipLink && client.baseUrl && (
                    <div className="flex justify-end">
                        <a
                            href={client.baseUrl}
                            className="text-sm text-[#5e17eb] hover:text-[#4a12bc] font-medium"
                        >
                            {msg("backToApplication")}
                        </a>
                    </div>
                )}
            </div>
        </Template>
    );
}
