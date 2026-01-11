import { useI18n } from "@/login/i18n";
import { useKcContext } from "@/login/KcContext";
import { assert } from "tsafe/assert";
import { Template } from "../../components/Template";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "login-verify-email.ftl");

    const { msg } = useI18n();

    const { url, user } = kcContext;
    return (
        <Template
            displayInfo
            headerNode={
                <div className="text-center">
                    <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
                        {msg("emailVerifyTitle")}
                    </p>
                </div>
            }
            infoNode={
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {msg("emailVerifyInstruction2")}
                    <br />
                    <a
                        className="text-[#5e17eb] hover:text-[#4a12bc] font-medium"
                        href={url.loginAction}
                    >
                        {msg("doClickHere")}
                    </a>
                    &nbsp;
                    {msg("emailVerifyInstruction3")}
                </p>
            }
        >
            <p className="text-sm text-gray-700 dark:text-gray-300">
                {msg("emailVerifyInstruction1", user?.email ?? "")}
            </p>
        </Template>
    );
}
