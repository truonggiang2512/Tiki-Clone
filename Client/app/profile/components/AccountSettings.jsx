import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function AccountSettings() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Account Settings
      </h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Change Password
          </h3>
          <form className="space-y-4">
            <div>
              <Label htmlFor="current-password">Current Password</Label>
              <Input type="password" id="current-password" />
            </div>
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input type="password" id="new-password" />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input type="password" id="confirm-password" />
            </div>
            <Button type="submit">Update Password</Button>
          </form>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Payment Methods
          </h3>
          <Button variant="outline">Manage Payment Methods</Button>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Notification Preferences
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch id="email-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <Switch id="sms-notifications" />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Delete Account
          </h3>
          <p className="text-gray-600 mb-2">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <Button variant="destructive">Delete Account</Button>
        </div>
      </div>
    </div>
  );
}
