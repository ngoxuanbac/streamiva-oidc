import { Alert, AlertDescription } from "@/components/ui/alert";
import { useI18n } from "@/login/i18n";
import { useKcContext } from "@/login/KcContext";
import { assert } from "tsafe/assert";
import { Template } from "../../components/Template";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "login-page-expired.ftl");

    const { msg } = useI18n();

    return (
        <Template
            headerNode={
                <div className="text-center">
                    <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
                        {msg("pageExpiredTitle")}
                    </p>
                </div>
            }
        >
            <Alert variant="warning" className="my-6">
                <AlertDescription>
                    <div className="space-y-3 text-sm leading-relaxed">
                        <p>
                            {msg("pageExpiredMsg1")}{" "}
                            <a
                                id="loginRestartLink"
                                href={kcContext.url.loginRestartFlowUrl}
                                className="text-[#5e17eb] hover:text-[#4a12bc] font-medium"
                            >
                                {msg("doClickHere")}
                            </a>
                            .
                        </p>
                        <p>
                            {msg("pageExpiredMsg2")}{" "}
                            <a
                                id="loginContinueLink"
                                href={kcContext.url.loginAction}
                                className="text-[#5e17eb] hover:text-[#4a12bc] font-medium"
                            >
                                {msg("doClickHere")}
                            </a>
                            .
                        </p>
                    </div>
                </AlertDescription>
            </Alert>
        </Template>
    );
}
