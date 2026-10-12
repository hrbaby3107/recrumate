import { useState } from "react";
import {
  Settings,
  User,
  Bell,
  Palette,
  GitBranch,
  Tags,
  Mail,
  Users,
  Shield,
  Check,
  Moon,
  Sun,
  Save,
} from "lucide-react";
import { useApp } from "../../store/AppContext";
import { PipelineSection, TagsSection, TemplatesSection, WorkspaceSection, PrivacySection } from "./SettingsSections";

type Section =
  | "profile"
  | "notifications"
  | "appearance"
  | "pipeline"
  | "tags"
  | "templates"
  | "workspace"
  | "privacy";

const sectionGroups: { group: string; items: { id: Section; label: string; icon: typeof User }[] }[] = [
  {
    group: "Account",
    items: [
      { id: "profile", label: "Profile", icon: User },
      { id: "notifications", label: "Notifications", icon: Bell },
      { id: "appearance", label: "Appearance", icon: Palette },
    ],
  },
  {
    group: "Recruitment",
    items: [
      { id: "pipeline", label: "Pipeline", icon: GitBranch },
      { id: "tags", label: "Tags & Sources", icon: Tags },
      { id: "templates", label: "Message Templates", icon: Mail },
    ],
  },
  {
    group: "Workspace",
    items: [{ id: "workspace", label: "Team & Roles", icon: Users }],
  },
  {
    group: "Data & Privacy",
    items: [{ id: "privacy", label: "CV Storage & Data", icon: Shield }],
  },
];

export default function SettingsPage() {
  const { darkMode, toggleDarkMode, pushToast } = useApp();
  const [section, setSection] = useState<Section>("profile");

  return (
    <div className="flex h-full flex-col lg:flex-row">
      {/* Settings sidebar */}
      <aside className="w-full shrink-0 border-b border-slate-200 bg-white p-4 lg:w-64 lg:border-b-0 lg:border-r dark:border-slate-800 dark:bg-slate-900">
        <h1 className="mb-4 flex items-center gap-2 px-2 text-lg font-bold text-slate-900 dark:text-white">
          <Settings className="h-5 w-5 text-brand-500" />
          Settings
        </h1>
        <nav className="space-y-4">
          {sectionGroups.map((g) => (
            <div key={g.group}>
              <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                {g.group}
              </p>
              {g.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSection(item.id)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    section === item.id
                      ? "bg-brand-600 text-white"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* Settings content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-3xl">
          {section === "profile" && <ProfileSection />}
          {section === "notifications" && <NotificationsSection />}
          {section === "appearance" && (
            <AppearanceSection darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          )}
          {section === "pipeline" && <PipelineSection pushToast={pushToast} />}
          {section === "tags" && <TagsSection pushToast={pushToast} />}
          {section === "templates" && <TemplatesSection pushToast={pushToast} />}
          {section === "workspace" && <WorkspaceSection />}
          {section === "privacy" && <PrivacySection pushToast={pushToast} />}
        </div>
      </div>
    </div>
  );
}

/* ============ Shared UI ============ */

function Card({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h2>
      {desc && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{desc}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${on ? "bg-brand-600" : "bg-slate-300 dark:bg-slate-700"}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );
}

function Input({ label, value, onChange, placeholder, type = "text" }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-input"
        placeholder={placeholder}
      />
    </label>
  );
}

function SaveButton({ onSave }: { onSave: () => void }) {
  return (
    <button
      onClick={onSave}
      className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
    >
      <Save className="h-4 w-4" /> Save Changes
    </button>
  );
}

/* ============ Profile ============ */

function ProfileSection() {
  const { pushToast } = useApp();
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Kylie (Ngan)",
    email: "ngan.tran4@reco-vn.com",
    phone: "0776 931 508",
    jobTitle: "IT Headhunter & Talent Acquisition",
    signature: "Best regards,\nKylie (Ngan)\nIT Headhunter | RecruMate\nZalo: 0776 931 508",
    linkedin: "https://linkedin.com/in/kylie-ngan",
    facebook: "https://facebook.com/kylie.ngan",
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Recruiter Profile</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Your public-facing recruiter identity.</p>
        </div>
        {!editing && (
          <button onClick={() => setEditing(true)} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
            Edit Profile
          </button>
        )}
      </div>

      <Card title="Avatar & Identity">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-2xl font-bold text-white">
              K
            </div>
            <button className="text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">Change avatar</button>
          </div>
          <div className="flex-1 space-y-3">
            {!editing ? (
              <>
                <ProfileRow label="Name" value={profile.name} />
                <ProfileRow label="Job title" value={profile.jobTitle} />
                <ProfileRow label="Email" value={profile.email} />
                <ProfileRow label="Phone" value={profile.phone} />
                <ProfileRow label="LinkedIn" value={profile.linkedin} />
                <ProfileRow label="Facebook" value={profile.facebook} />
              </>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                <Input label="Name" value={profile.name} onChange={(v) => setProfile({ ...profile, name: v })} />
                <Input label="Job title" value={profile.jobTitle} onChange={(v) => setProfile({ ...profile, jobTitle: v })} />
                <Input label="Email" value={profile.email} onChange={(v) => setProfile({ ...profile, email: v })} />
                <Input label="Phone" value={profile.phone} onChange={(v) => setProfile({ ...profile, phone: v })} />
                <Input label="LinkedIn URL" value={profile.linkedin} onChange={(v) => setProfile({ ...profile, linkedin: v })} />
                <Input label="Facebook URL" value={profile.facebook} onChange={(v) => setProfile({ ...profile, facebook: v })} />
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Default signature</span>
                  <textarea
                    value={profile.signature}
                    onChange={(e) => setProfile({ ...profile, signature: e.target.value })}
                    rows={4}
                    className="form-input resize-none"
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      </Card>

      {editing && (
        <div className="flex gap-3">
          <SaveButton onSave={() => { setEditing(false); pushToast("Profile updated.", "success"); }} />
          <button onClick={() => setEditing(false)} className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
      <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
      <span className="text-sm font-medium text-slate-900 dark:text-white">{value}</span>
    </div>
  );
}

/* ============ Notifications ============ */

function NotificationsSection() {
  const { pushToast } = useApp();
  const [channels, setChannels] = useState({ email: true, inApp: true });
  const [prefs, setPrefs] = useState({
    newCandidate: true,
    movedToInterview: true,
    interviewReminder: true,
    followUpDue: true,
    offerPending: false,
    noReply: true,
    newApplication: true,
    upcomingInterview: true,
    taskOverdue: true,
  });

  const items: { key: keyof typeof prefs; label: string; desc: string }[] = [
    { key: "newCandidate", label: "New candidate applied", desc: "When someone submits a CV or applies to a job." },
    { key: "movedToInterview", label: "Candidate moved to Interview", desc: "When a candidate reaches the interview stage." },
    { key: "interviewReminder", label: "Interview reminder", desc: "Reminder before a scheduled interview." },
    { key: "followUpDue", label: "Follow-up due", desc: "When a follow-up task is due today or overdue." },
    { key: "offerPending", label: "Offer pending", desc: "When an offer is awaiting candidate response." },
    { key: "noReply", label: "Candidate hasn't replied", desc: "No response after 3 days since last contact." },
    { key: "newApplication", label: "New application for assigned JD", desc: "New application on a job you own." },
    { key: "upcomingInterview", label: "Upcoming interview", desc: "Interview scheduled in the next 24 hours." },
    { key: "taskOverdue", label: "Task overdue", desc: "A task has passed its due date." },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Notifications</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Choose what alerts you receive and how.</p>
      </div>

      <Card title="Delivery channels" desc="Where should notifications be sent?">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-slate-400" />
              <div><p className="text-sm font-medium text-slate-900 dark:text-white">Email</p><p className="text-xs text-slate-500">Send to ngan.tran4@reco-vn.com</p></div>
            </div>
            <Toggle on={channels.email} onToggle={() => setChannels({ ...channels, email: !channels.email })} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-slate-400" />
              <div><p className="text-sm font-medium text-slate-900 dark:text-white">In-app</p><p className="text-xs text-slate-500">Show in the ATS notification panel</p></div>
            </div>
            <Toggle on={channels.inApp} onToggle={() => setChannels({ ...channels, inApp: !channels.inApp })} />
          </div>
        </div>
      </Card>

      <Card title="Notification preferences" desc="Toggle individual alerts on or off.">
        <div className="space-y-1">
          {items.map((item) => (
            <div key={item.key} className="flex items-center justify-between border-b border-slate-100 py-3 last:border-0 dark:border-slate-800">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{item.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
              <Toggle on={prefs[item.key]} onToggle={() => setPrefs({ ...prefs, [item.key]: !prefs[item.key] })} />
            </div>
          ))}
        </div>
      </Card>

      <SaveButton onSave={() => pushToast("Notification settings saved.", "success")} />
    </div>
  );
}

/* ============ Appearance ============ */

function AppearanceSection({ darkMode, toggleDarkMode }: { darkMode: boolean; toggleDarkMode: () => void }) {
  const { pushToast } = useApp();
  const [accent, setAccent] = useState("Pink / Magenta");
  const [density, setDensity] = useState("Comfortable");
  const [language, setLanguage] = useState("English");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [timeZone, setTimeZone] = useState("Asia/Ho_Chi_Minh (GMT+7)");

  const accents = ["Pink / Magenta", "Blue", "Green", "Orange", "Teal"];
  const densities = ["Compact", "Comfortable"];
  const languages = ["English", "Vietnamese"];
  const dateFormats = ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Appearance</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Customize how RecruMate looks and feels.</p>
      </div>

      <Card title="Theme">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {darkMode ? <Moon className="h-5 w-5 text-brand-500" /> : <Sun className="h-5 w-5 text-brand-500" />}
            <div><p className="text-sm font-medium text-slate-900 dark:text-white">Dark mode</p><p className="text-xs text-slate-500 dark:text-slate-400">Switch between light and dark theme</p></div>
          </div>
          <Toggle on={darkMode} onToggle={toggleDarkMode} />
        </div>
      </Card>

      <Card title="Accent color" desc="The primary color used across the app.">
        <div className="flex flex-wrap gap-2">
          {accents.map((a) => (
            <button
              key={a}
              onClick={() => setAccent(a)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                accent === a
                  ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-600/10 dark:text-brand-300"
                  : "border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:text-slate-400"
              }`}
            >
              {accent === a && <Check className="mr-1 inline h-3.5 w-3.5" />}
              {a}
            </button>
          ))}
        </div>
      </Card>

      <Card title="Display preferences">
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField label="Density" value={density} onChange={setDensity} options={densities} />
          <SelectField label="Language" value={language} onChange={setLanguage} options={languages} />
          <SelectField label="Date format" value={dateFormat} onChange={setDateFormat} options={dateFormats} />
          <SelectField label="Time zone" value={timeZone} onChange={setTimeZone} options={["Asia/Ho_Chi_Minh (GMT+7)", "Asia/Singapore (GMT+8)", "UTC"]} />
        </div>
      </Card>

      <SaveButton onSave={() => pushToast("Appearance settings saved.", "success")} />
    </div>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="form-input">
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
