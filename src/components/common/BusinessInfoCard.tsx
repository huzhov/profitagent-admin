import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

export default function BusinessInfoCard({ type }: { type: string }) {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="shadow-none border-blue-200 bg-blue-50">
        <CardContent>
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-blue-900">
                Business Setup Required
              </p>
              <p className="text-sm text-blue-700">
                You need to create a business in the{" "}
                <a
                  href="/settings/account#business-settings"
                  className="underline font-medium hover:text-blue-900"
                >
                  Account & Integration Settings
                </a>{" "}
                before you can use {type}.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
