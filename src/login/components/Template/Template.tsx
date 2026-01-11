import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { kcSanitize } from "@keycloakify/login-ui/kcSanitize";
import { useKcClsx } from "@keycloakify/login-ui/useKcClsx";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@radix-ui/react-tooltip";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { RotateCcw } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { useI18n } from "../../i18n";
import { useKcContext } from "../../KcContext";
import companylogo from "./../../assets/img/streamiva.svg";
import { useInitializeTemplate } from "./useInitializeTemplate";

export function Template(props: {
    displayInfo?: boolean;
    displayMessage?: boolean;
    displayRequiredFields?: boolean;
    headerNode: ReactNode;
    socialProvidersNode?: ReactNode;
    infoNode?: ReactNode;
    documentTitle?: string;
    bodyClassName?: string;
    children: ReactNode;
}) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        children
    } = props;

    const { kcContext } = useKcContext();

    const { auth, url, message, isAppInitiatedAction } = kcContext;

    const { msg, msgStr } = useI18n();

    const { kcClsx } = useKcClsx();

    useEffect(() => {
        document.title =
            documentTitle ?? msgStr("loginTitle", kcContext.realm.displayName);
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? kcClsx("kcBodyClass")
    });

    const { isReadyToRender } = useInitializeTemplate();

    if (!isReadyToRender) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            {/* Main content - positioned higher */}
            <div className="flex flex-1 items-start justify-center px-4 lg:p-6 lg:md:p-10 lg:pt-10 min-h-screen lg:min-h-0">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="flex justify-center">
                        <img
                            src={companylogo}
                            alt="Streamiva Logo"
                            className="h-12 w-auto"
                        />
                    </div>

                    {/* Title/Header */}
                    <div className="text-center mb-8">
                        {(() => {
                            const node = !(
                                auth !== undefined &&
                                auth.showUsername &&
                                !auth.showResetCredentials
                            ) ? (
                                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {headerNode}
                                </h1>
                            ) : (
                                <div
                                    id="kc-username"
                                    className="flex items-center justify-center gap-2"
                                >
                                    <label
                                        className="font-semibold text-lg text-gray-900 dark:text-white"
                                        id="kc-attempted-username"
                                    >
                                        {auth.attemptedUsername}
                                    </label>

                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    asChild
                                                >
                                                    <a
                                                        id="reset-login"
                                                        href={url.loginRestartFlowUrl}
                                                        aria-label={msgStr(
                                                            "restartLoginTooltip"
                                                        )}
                                                    >
                                                        <RotateCcw className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{msg("restartLoginTooltip")}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            );

                            if (displayRequiredFields) {
                                return (
                                    <div className="flex items-center justify-between gap-2">
                                        <div>{node}</div>
                                        <div>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                <span className="text-red-500">*</span>
                                                {msg("requiredFields")}
                                            </span>
                                        </div>
                                    </div>
                                );
                            }

                            return node;
                        })()}
                    </div>

                    {/* Messages */}
                    {displayMessage &&
                        message !== undefined &&
                        (message.type !== "warning" || !isAppInitiatedAction) && (
                            <Alert variant={message.type} className="mb-4">
                                <AlertDescription>
                                    <div>
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: kcSanitize(message.summary)
                                            }}
                                        />
                                    </div>
                                </AlertDescription>
                            </Alert>
                        )}

                    {/* Form Content - No Card wrapper */}
                    <div id="kc-content">
                        <div id="kc-content-wrapper">
                            <div className="children">{children}</div>
                            {socialProvidersNode}
                            {auth !== undefined && auth.showTryAnotherWayLink && (
                                <form
                                    id="kc-select-try-another-way-form"
                                    action={url.loginAction}
                                    method="post"
                                    className="mt-4"
                                >
                                    <div className={kcClsx("kcFormGroupClass")}>
                                        <input
                                            type="hidden"
                                            name="tryAnotherWay"
                                            value="on"
                                        />
                                        <a
                                            href="#"
                                            id="try-another-way"
                                            className="text-[#5e17eb] hover:text-[#4a12bc] text-sm font-medium"
                                            onClick={() => {
                                                document.forms[
                                                    "kc-select-try-another-way-form" as never
                                                ].submit();
                                                return false;
                                            }}
                                        >
                                            {msg("doTryAnotherWay")}
                                        </a>
                                    </div>
                                </form>
                            )}
                            {displayInfo && (
                                <div className="text-center text-sm mt-6">{infoNode}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
