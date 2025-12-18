import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Info } from "lucide-react";

export default function BusinessSetupInfoCard({ page }: { page: string }) {
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
                <Link
                  to="/settings/account"
                  hash="business-settings"
                  className="underline font-medium hover:text-blue-900"
                >
                  Account & Integration Settings
                </Link>{" "}
                before you can use {page}.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
