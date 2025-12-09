# 🎯 Exercice : Cycle de vie

## Objectif
Créer un **gestionnaire de notifications** pour comprendre le cycle de vie complet (mount, update, unmount).

---

## 📝 Instructions

Créez un fichier `NotificationManager.tsx` qui gère des notifications temporaires avec:

### Fonctionnalités requises

1. **Afficher des notifications** (success, error, info, warning)
2. **Auto-suppression** après 3 secondes
3. **Suppression manuelle** (bouton X)
4. **Animation** au montage et démontage
5. **Maximum 5 notifications** simultanées

---

## 🎨 Types

```typescript
type NotificationType = "success" | "error" | "info" | "warning";

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  createdAt: Date;
}
```

---

## ✅ Checklist des concepts à utiliser

- [ ] **Mount** : `useEffect(() => {}, [])` pour l'auto-suppression
- [ ] **Update** : `useEffect(() => {}, [deps])` pour tracker les changements
- [ ] **Unmount** : Cleanup function pour clearTimeout
- [ ] État local pour gérer la liste de notifications
- [ ] Génération d'ID unique (Date.now() ou crypto.randomUUID())

---

## 💡 Exemple de rendu attendu

```
[SUCCESS] ✓ Fichier enregistré! [X]
[ERROR]   ✗ Erreur réseau [X]
[INFO]    ℹ Mise à jour disponible [X]

[Ajouter Success] [Ajouter Error] [Ajouter Info] [Ajouter Warning]
```

---

## 🎓 Points clés du cycle de vie

### Phase 1: Montage (componentDidMount)
```typescript
// Chaque notification démarre un timer au montage
useEffect(() => {
  const timer = setTimeout(() => {
    removeNotification(notification.id);
  }, 3000);

  return () => clearTimeout(timer); // Cleanup!
}, []); // Tableau vide = au montage seulement
```

### Phase 2: Mise à jour (componentDidUpdate)
```typescript
// Logger quand le nombre de notifications change
useEffect(() => {
  console.log(`Nombre de notifications: ${notifications.length}`);
}, [notifications.length]); // Se déclenche à chaque changement
```

### Phase 3: Démontage (componentWillUnmount)
```typescript
// Cleanup automatique du timer quand la notification est supprimée
useEffect(() => {
  const timer = setTimeout(...);

  return () => {
    console.log("Notification removed, cleaning up timer");
    clearTimeout(timer);
  };
}, []);
```

---

## 🚀 Structure suggérée

### Composant NotificationItem (une seule notification)
```typescript
import { useEffect } from "react";

interface NotificationItemProps {
  notification: Notification;
  onRemove: (id: string) => void;
}

const NotificationItem = ({ notification, onRemove }: NotificationItemProps) => {
  // TODO: useEffect pour auto-suppression après 3s
  // TODO: Cleanup du timer

  // TODO: useEffect pour logger le montage/démontage
  useEffect(() => {
    console.log(`✅ Notification ${notification.id} mounted`);

    return () => {
      console.log(`❌ Notification ${notification.id} unmounted`);
    };
  }, []);

  return (
    <div style={{ /* styles selon le type */ }}>
      {notification.message}
      <button onClick={() => onRemove(notification.id)}>X</button>
    </div>
  );
};
```

### Composant NotificationManager (gestionnaire)
```typescript
export const NotificationManager = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // TODO: Fonction pour ajouter une notification
  const addNotification = (type: NotificationType, message: string) => {
    // Limiter à 5 notifications max
    // Générer un ID unique
    // Ajouter à la liste
  };

  // TODO: Fonction pour supprimer une notification
  const removeNotification = (id: string) => {
    // Filtrer la liste
  };

  // TODO: useEffect pour logger les changements de taille
  useEffect(() => {
    console.log(`📊 Total notifications: ${notifications.length}`);
  }, [notifications.length]);

  return (
    // TODO: UI - liste de NotificationItem - ajout et suppression
  );
};
```

---

## 🎨 Styles suggérés

```typescript
const getNotificationStyle = (): React.CSSProperties => {
  const baseStyle = {
    padding: "12px 16px",
    marginBottom: "8px",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    animation: "slideIn 0.3s ease-out",
  };

  const colors = {
    success: { background: "#d4edda", color: "#155724", border: "1px solid #c3e6cb" },
    error: { background: "#f8d7da", color: "#721c24", border: "1px solid #f5c6cb" },
    info: { background: "#d1ecf1", color: "#0c5460", border: "1px solid #bee5eb" },
    warning: { background: "#fff3cd", color: "#856404", border: "1px solid #ffeaa7" },
  };

  return { ...baseStyle, ...colors[notification.type] };
};

return (
    <div style={getNotificationStyle()}>
      <span>
        {notification.message}
      </span>
      <button
        onClick={() => onRemove(notification.id)}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        ×
      </button>
    </div>
  );
```

---

## 🚀 Extensions (Bonus)

1. **Animations CSS** : Slide-in au montage, fade-out au démontage
2. **Barre de progression** : Afficher le temps restant (3s)
3. **Pause au hover** : Arrêter le timer quand souris dessus
4. **Sons** : Jouer un son selon le type
5. **Persistance** : Sauvegarder dans sessionStorage

---

## 🔍 Auto-évaluation

Vérifiez que vous avez bien compris:

- [ ] Je comprends quand useEffect se déclenche
- [ ] Je sais utiliser `[]` pour du code au montage uniquement
- [ ] Je sais utiliser `[deps]` pour réagir aux changements
- [ ] Je sais écrire une cleanup function
- [ ] Je comprends pourquoi le cleanup est important
- [ ] Je sais gérer plusieurs effets dans un composant
- [ ] Je comprends le cycle de vie complet

---

---

---

---

---

## 💭 Solution

<details>
<summary>Cliquez pour voir une solution possible</summary>

```typescript
import { useState, useEffect } from "react";

type NotificationType = "success" | "error" | "info" | "warning";

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  createdAt: Date;
}

// Composant pour une notification individuelle
const NotificationItem = ({
  notification,
  onRemove,
}: {
  notification: Notification;
  onRemove: (id: string) => void;
}) => {
  // ✅ MOUNT: Auto-suppression après 3 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(notification.id);
    }, 3000);

    // ✅ UNMOUNT: Cleanup du timer
    return () => clearTimeout(timer);
  }, []); // Montage uniquement

  // ✅ MOUNT + UNMOUNT: Logger pour debug
  useEffect(() => {
    console.log(`✅ Notification ${notification.id} montée`);

    return () => {
      console.log(`❌ Notification ${notification.id} démontée`);
    };
  }, [notification.id]);

  const getStyle = (): React.CSSProperties => {
    const base = {
      padding: "12px 16px",
      marginBottom: "8px",
      borderRadius: "4px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      animation: "slideIn 0.3s ease-out",
    };

    const colors = {
      success: { background: "#d4edda", color: "#155724" },
      error: { background: "#f8d7da", color: "#721c24" },
      info: { background: "#d1ecf1", color: "#0c5460" },
      warning: { background: "#fff3cd", color: "#856404" },
    };

    return { ...base, ...colors[notification.type] };
  };

  const getIcon = () => {
    const icons = {
      success: "✓",
      error: "✗",
      info: "ℹ",
      warning: "⚠",
    };
    return icons[notification.type];
  };

  return (
    <div style={getStyle()}>
      <span>
        <strong>{getIcon()}</strong> {notification.message}
      </span>
      <button
        onClick={() => onRemove(notification.id)}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        ×
      </button>
    </div>
  );
};

// Gestionnaire de notifications
export const NotificationManager = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Ajouter une notification
  const addNotification = (type: NotificationType, message: string) => {
    setNotifications(prev => {
      // Limiter à 5 notifications
      const newNotifications = [...prev];
      if (newNotifications.length >= 5) {
        newNotifications.shift(); // Supprimer la plus ancienne
      }

      return [
        ...newNotifications,
        {
          id: crypto.randomUUID(),
          type,
          message,
          createdAt: new Date(),
        },
      ];
    });
  };

  // Supprimer une notification
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // ✅ UPDATE: Logger quand le nombre change
  useEffect(() => {
    console.log(`📊 Total de notifications: ${notifications.length}`);
  }, [notifications.length]);

  // ✅ MOUNT: Logger au premier montage
  useEffect(() => {
    console.log("🎬 NotificationManager monté");

    return () => {
      console.log("🛑 NotificationManager démonté");
    };
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Gestionnaire de Notifications</h2>

      {/* Zone de notifications */}
      <div style={{ marginBottom: "20px", minHeight: "200px" }}>
        {notifications.map(notification => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRemove={removeNotification}
          />
        ))}
      </div>

      {/* Boutons de test */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button onClick={() => addNotification("success", "Opération réussie!")}>
          Ajouter Success
        </button>
        <button onClick={() => addNotification("error", "Une erreur est survenue")}>
          Ajouter Error
        </button>
        <button onClick={() => addNotification("info", "Information importante")}>
          Ajouter Info
        </button>
        <button onClick={() => addNotification("warning", "Attention requise")}>
          Ajouter Warning
        </button>
      </div>

      <div style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
        Notifications actives: {notifications.length}/5
      </div>

      {/* Animation CSS */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
```

</details>

---

## 🎯 Validation par le formateur

Critères d'évaluation:
- [ ] Mount: useEffect avec `[]` utilisé correctement
- [ ] Update: useEffect avec `[deps]` pour les changements
- [ ] Unmount: Cleanup functions présentes
- [ ] Pas de memory leaks (timers nettoyés)
- [ ] Les notifications s'auto-suppriment après 3s
- [ ] Maximum 5 notifications respecté
- [ ] Console logs montrent le cycle de vie
